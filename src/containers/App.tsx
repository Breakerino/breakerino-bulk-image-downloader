import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Heading, Image, Input, Text, Textarea } from '@chakra-ui/react';
import fileDownload from 'js-file-download';
import JSZip from 'jszip';
import { get, isEmpty, isString, isUndefined } from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface AppProps {

}

const IMAGE_MIMETYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml', 'image/tiff', 'image/ico'];

const App: React.FC<AppProps> = ({ }) => {

	const { handleSubmit, register, formState: { touchedFields, errors = { urls: { message: null } }, isSubmitting } } = useForm({
		defaultValues: {
			urls: [],
		},
		mode: 'onChange'
	});
	const [isLoading, setIsLoading] = React.useState(false);

	const [images, setImages] = React.useState<{
		valid: Record<string, any>[];
		invalid: Record<string, any>[];
	}>({ valid: [], invalid: [] });

	const onSubmit = async (values: Record<string, any>) => {
		setIsLoading(true);

		const urls = get(values, 'urls', '').split('\n');

		console.log('got', urls.join("\n"));

		const images: any = { valid: [], invalid: [] };

		// loop through urls, check if valid, if so add to images
		for (const [index, url] of urls.entries()) {
			try {
				new URL(url);
				const res = await fetch(url);
				const type = res.headers.get('content-type') ?? '';
				const name = res.headers.get('content-disposition') ?? `image-${index}`;
				console.log({name});
				
				if (IMAGE_MIMETYPES.includes(type)) {
					images.valid.push({ url, format: type.split('/')[1], name, valid: true, selected: true });
				} else {
					images.invalid.push({ url, format: 'N/A', name, valid: false });
				}
			} catch (error) {
				images.invalid.push({
					name: 'N/A',
					url,
					error,
				});
			}
		}

		setImages(images);
		setIsLoading(false);
	}

	const handleLoadRandom = async () => {
		setIsLoading(true);
		const numOfImages = Math.round(Math.random() * (12 - 3 + 1)) * 3;

		const urls = Array.from({ length: numOfImages }, () => {
			// gen random seed
			const seed = Math.floor(Math.random() * 1000000);
			return `https://picsum.photos/seed/${seed}/200/300`;
		});

		console.log('gen random', urls.join("\n"));

		const images: any = { valid: [], invalid: [] };

		// loop through urls, check if valid, if so add to images
		for (const [index, url] of urls.entries()) {
			if (new URL(url)) {
				const res = await fetch(url);
				const type = res.headers.get('content-type') ?? '';
				const name = res.headers.get('content-disposition') ?? `image-${index}`;
				if (IMAGE_MIMETYPES.includes(type)) {
					images.valid.push({ url, format: type.split('/')[1], name, valid: true, selected: false });
				} else {
					images.invalid.push({ url, format: 'N/A', name, valid: false });
				}
			} else {
				images.invalid.push(url);
			}
		}

		setImages(images);
		setIsLoading(false);
	}


	const downloadImage = async ({ name, format, url }: any) => {
		const response = await fetch(url);
		const imageData = await response.blob();
		fileDownload(imageData, `${name}.${format}`);
	}

	const handleSingleImageDownload = async ({ name, format, url }: any) => {
		setIsLoading(true);

		await downloadImage({ url, name, format, });
		setIsLoading(false);
	}

	const downloadSelectedImages = async (method: 'zip' | 'single') => {
		setIsLoading(true);
		// transform method check to switch statement
		switch (method) {
			case 'zip':
				const zip = new JSZip();
				const imagesMetaData: any = [];
				
				selectedImages.forEach(({ name, format, url }: any) => {
					imagesMetaData.push({
						name,
						format,
						origin: url
					})
					zip.file(`${name}.${format}`, fetch(url).then(res => res.blob()));
				}
				);
				
				// include imageMeta as json file
				zip.file('images-metadata.json', JSON.stringify(imagesMetaData));
				
				const zipData = await zip.generateAsync({ type: 'blob' })
				const date = new Date().toISOString().split('T')[0];
				const time = new Date().toISOString().split('T')[1].split('.')[0];
				
				const filename = `images-${selectedImages.length}-${date}-${time}.zip`;
				fileDownload(zipData, filename);
				break;
			case 'single':
				await Promise.all(selectedImages.map(async (image: any) => await downloadImage(image)));
				break;
			default:
				break;
		}

		setIsLoading(false);
	}

	const toggleImageSelected = (index: number) => {
		const newImages: any = { ...images };
		newImages.valid[index].selected = !newImages.valid[index].selected;
		setImages(newImages);
	}

	const handleUpdateImageFileNameUpdate = (e: any, index: number) => {
		// update image name state
		const newImages: any = { ...images };
		newImages.valid[index].name = e.target.value;
		setImages(newImages);
		setEditedImageIndex(null);
	}
	
	const selectedImages = React.useMemo(() => images.valid.filter(({ selected }) => selected), [images]);

	const [editedImageIndex, setEditedImageIndex] = React.useState<number | null>(null);

	return (
		<Container my="10" maxWidth="container.lg">
			<Flex direction="column" as="form" p={6} background="blue.100" borderRadius="md" onSubmit={handleSubmit(onSubmit)}>
				<Heading mb={4} color="blue.600">
					Bulk Image Downloader
				</Heading>
				<Heading mb={4} size="sm" color="blue.600">
					Bulk Image Downloader is an free, browser-based online tool to download images from a list of URLs. It supports multiple image formats and can also download multiple images in a ZIP archive.
				</Heading>
				<FormControl isInvalid={!isEmpty(errors.urls)}>
					<FormLabel>Enter a list of image URLs (one per line)</FormLabel>
					<Textarea
						{...register('urls', {
							required: true,
							validate: (value: any) => {
								console.log(value);

								if (isEmpty(value) || !isString(value)) {
									return false;
								}

								const urls = value.split('\n');
								
								for (const url of urls) {
									try {
										const urlObject = new URL(url);
										if (!["https:", "http:"].includes(urlObject.protocol)) {
											return false;
										}

									} catch (error) {
										console.log({ error });

										return false
									}

									return true;
								}
							}
						})}
						background="white" w="full" />
				</FormControl>
				<FormErrorMessage>
					{get(errors, 'urls.message')}
				</FormErrorMessage>
				<Flex gap="4">
					<Button mt={4} colorScheme='blue'
						disabled={!isEmpty(errors.urls) || isUndefined(touchedFields?.urls) || isSubmitting || isLoading}
						isLoading={isSubmitting || isLoading} type='submit'>Load images</Button>
					<Button mt={4} colorScheme='blue' isLoading={isSubmitting || isLoading} onClick={handleLoadRandom}>Load random images</Button>
				</Flex>
			</Flex>

			<Grid mt={8} gridTemplate="auto / repeat(3, 1fr)" gridGap={8}>
				{[...images.valid, ...images.invalid].map(({ name, url, format, valid, selected }, index) => (
					<GridItem key={index} border="0.25em solid" cursor="pointer" _hover={{
						borderColor: valid ? (selected ? 'blue.300' : 'gray.400') : 'red.300'
					}} borderColor={valid ? (selected ? 'blue.300' : 'gray.300') : 'red.300'} borderRadius="md">
						<Flex alignItems="center" justifyContent="center" w="full" height="20rem" backgroundColor="gray.100" onClick={() => valid && toggleImageSelected(index)}>
							{ valid 
								? <Image src={url} w="full" height="100%" objectFit="cover" objectPosition="center" alt="image" /> 
								: <Text fontSize="xl" textAlign="center" color="red.500">Invalid image</Text>
							}
						</Flex>
						<Flex p={3} direction="column">
							<Box>
								{valid && editedImageIndex === index ? (
									<Input defaultValue={name} 
									onBlur={(e: any) => handleUpdateImageFileNameUpdate(e, index)}
									onKeyDown={(e: any) => e.key === 'Enter' && handleUpdateImageFileNameUpdate(e, index)}
									/>
								) : (
									<Text title={name} onDoubleClick={() => valid && setEditedImageIndex(index)} as="small" fontSize={14} noOfLines={1} wordBreak="break-all">{name}</Text>
								)}
							</Box>
							<Text as="small" title={url} fontSize={10} noOfLines={1} wordBreak="break-all" color={valid ? 'gray.500' : 'red.500'} >{url}</Text>
							{valid 
							? <Button mt={2} colorScheme="blue" isLoading={isSubmitting || isLoading} onClick={() => handleSingleImageDownload({ name, format, url })}>Download image</Button>
							: <Button mt={2} colorScheme="red" disabled={true} isLoading={isSubmitting || isLoading}>Invalid image</Button>
						}
						</Flex>
					</GridItem>
				))}
			</Grid>

			{!isEmpty([...images.valid, ...images.invalid]) && ! (isSubmitting || isLoading) && (
				<Flex mt={4} direction="column" background="blue.100" borderRadius="md" p={6} position="sticky" bottom={0}>
					<Heading size="md" color="blue.600">
						Loaded {images.valid.length + images.invalid.length} images ({images.valid.length} valid, {images.invalid.length} invalid, {selectedImages.length} selected)
					</Heading>
					{!isEmpty(images?.valid)  && (
						<Flex gap={4}>
							<Button mt={4} w="1/4" disabled={selectedImages.length < 1} isLoading={isSubmitting || isLoading} colorScheme='blue' onClick={() => downloadSelectedImages('single')}>Download images</Button>
							<Button mt={4} w="1/4" disabled={selectedImages.length < 1} isLoading={isSubmitting || isLoading} colorScheme='blue' onClick={() => downloadSelectedImages('zip')}>Download images (ZIP)</Button>
							<Button mt={4} w="1/4" disabled={selectedImages.length === images.valid.length} isLoading={isSubmitting || isLoading} colorScheme='blue' onClick={() => {
								// select all 
								let newImages: any = { ...images };
								newImages.valid = newImages.valid.map((image: any) => ({ ...image, selected: true }));
								setImages(newImages);
							}}>Select all images</Button>
							<Button mt={4} disabled={selectedImages.length < 1} w="1/4" isLoading={isSubmitting || isLoading} colorScheme='blue' onClick={() => {
								// select all 
								let newImages: any = { ...images };
								newImages.valid = newImages.valid.map((image: any) => ({ ...image, selected: false }));
								setImages(newImages);
							}}>Deselect all images</Button>
						</Flex>
					)}
				</Flex>
			)}
		</Container>
	)
}

App.defaultProps = {};
App.displayName = 'App';

export default App;