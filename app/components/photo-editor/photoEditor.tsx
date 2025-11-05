import React, { useRef } from 'react';
import { useDrawCanvasImage, usePrintDescription, useHandlePhotoMove } from './hooks';
import {
	convertFileToHTMLImage,
	downloadFileInBrowser,
	getIsDataValidPrintDescription,
	getValidImage,
	printDescriptionToPixels,
	printDescriptionToInches
} from './utils';
import MoveButtons from './components/moveButtons';
import { Point } from './types';

export const PhotoEditor = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { printDescription, updatePrintDescription, updateCanvasImage } = usePrintDescription();
	const { clearCanvas, drawImageToCanvas } = useDrawCanvasImage(canvasRef);
	const { handlePhotoMove } = useHandlePhotoMove(canvasRef);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const validImage = getValidImage(e.target.files as FileList);

		if (validImage) {
			const reader = new FileReader();
			reader.onload = () => {
				const image = new Image();
				image.src = reader.result as string;
				image.onload = () => {
					if (image && canvasRef.current) {
						clearCanvas();
						const imageDetails = drawImageToCanvas(image, {
							center: true
						});

						updateCanvasImage({
							id: crypto.randomUUID(),
							src: image.src,
							...imageDetails,
						});
					}
				};
			};
			reader.readAsDataURL(validImage);
		}
	};

	const handleConfigUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) {
			return;
		}

		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = async (event: ProgressEvent<FileReader>) => {
			try {
				const jsonContent = event.target?.result;
				if (!jsonContent || typeof jsonContent !== 'string') {
					return;
				}

				const parsedData = JSON.parse(jsonContent);

				const isDataValidPrintDescription = getIsDataValidPrintDescription(parsedData);

				if (!isDataValidPrintDescription) {
					return;
				}

				const newPrintDescription = printDescriptionToPixels(parsedData);

				updatePrintDescription(newPrintDescription);

				const importedImage = newPrintDescription.canvas.photo;

				if (importedImage) {
					const imageElement = await convertFileToHTMLImage(importedImage);

					drawImageToCanvas(imageElement, {
						offsetX: importedImage.offsetX,
						offsetY: importedImage.offsetY
					});
				}
			} catch (error) {
				console.error(error);
			}
		};

		reader.readAsText(file);
	};

	const handleMove = async (point: Point) => {
		const { id, imageElement, offsetX, offsetY } = await handlePhotoMove(point, printDescription) ?? {};

		if (!imageElement) {
			return;
		}

		const photoDetails = drawImageToCanvas(imageElement, {
			offsetX,
			offsetY
		});

		updateCanvasImage({
			id,
			src: imageElement.src,
			...photoDetails
		});
	};

	const handleConfigExport = () => {
		const convertedPrintDescription =
			printDescriptionToInches(printDescription);

		try {
			downloadFileInBrowser(
				JSON.stringify(convertedPrintDescription, null, 2),
				'print-description.json',
				'application/json'
			);
		} catch (error) {
			console.error(error);
		}
	};


	return (
		<>
			<div>
				<h1>Photo Editor</h1>
				<label htmlFor="fileSelector">Upload Images</label>
				<input
					accept="image/jpeg, image/png, image/gif, image/webp"
					type="file"
					id="fileSelector"
					onChange={handleFileUpload}
				/>
			</div>

			<div>
				<label htmlFor="fileSelector">Load JSON config</label>
				<input
					type="file"
					accept=".json"
					data-testid="photo-editor-json-input"
					id="configSelector"
					onChange={handleConfigUpload}
				/>
			</div>

			<canvas
				ref={canvasRef}
				height={printDescription.canvas.height}
				width={printDescription.canvas.width}
				style={{ border: '2px solid green' }}
			/>

			{printDescription.canvas.photo && (
				<div>
					<MoveButtons onMove={handleMove} />

					<div>
						<button onClick={handleConfigExport}>Export image config</button>
					</div>
				</div>
			)}
		</>
	);
};
