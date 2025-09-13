import React from 'react';
import { Box, Button, chakra, Container, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Heading, Image, Input, Link, Text, Textarea } from '@chakra-ui/react';
import fileDownload from 'js-file-download';
import JSZip from 'jszip';
import { get, isEmpty, isString, isUndefined } from 'lodash';
import { useForm } from 'react-hook-form';
import { IMAGE_MIMETYPES } from '@/app/constants';

const App: React.FC = () => {
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
	
	const [urlsList, setUrlsList] = React.useState('');

	const onSubmit = async (values: Record<string, any>) => {
		setIsLoading(true);

		const urls = get(values, 'urls', '').split('\n');

		const images: any = { valid: [], invalid: [] };

		for (const [index, url] of urls.entries()) {
			try {
				new URL(url);
				const res = await fetch(url);
				const type = res.headers.get('content-type') ?? '';
				const name = res.headers.get('content-disposition') ?? `image-${index}`;

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
			const seed = Math.floor(Math.random() * 1000000);
			return `https://picsum.photos/seed/${seed}/200/300`;
		});
		
		setUrlsList(urls.join("\n"))

		const images: any = { valid: [], invalid: [] };

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
		const newImages: any = { ...images };
		newImages.valid[index].name = e.target.value;
		setImages(newImages);
		setEditedImageIndex(null);
	}

	const selectedImages = React.useMemo(() => images.valid.filter(({ selected }) => selected), [images]);

	const [editedImageIndex, setEditedImageIndex] = React.useState<number | null>(null);

	return (
		<Container as={Flex} direction="column" justifyContent="space-between" pt={10} maxWidth="container.lg" height="100dvh">
			<Flex as="main" direction="column">
				<Flex direction="column" as="form" p={6} background="blue.100" borderRadius="md" onSubmit={handleSubmit(onSubmit)}>
					<Heading as="h1" mb={4} color="blue.600" lineHeight={1.15}>
						Bulk Image Downloader
					</Heading>
					<Text mb={4} size="sm" color="blue.600" lineHeight={1.25} fontWeight={600}>
						Bulk Image Downloader is an free, browser-based online tool to download images from a list of URLs. It supports multiple image formats and can also download multiple images as a ZIP archive.
					</Text>
					<FormControl isInvalid={!isEmpty(errors.urls)}>
						<FormLabel>Enter a list of image URLs (one per line)</FormLabel>
						<Textarea
							value={urlsList}
							isDisabled={isSubmitting || isLoading}
							{...register('urls', {
								required: true,
								onChange: (e) => setUrlsList(e.value),
								validate: (value: any) => {
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

				{!isEmpty([...images.valid, ...images.invalid]) && (
					<Grid mt={8} gridTemplate={{base: "auto / 1fr", sm: "auto / repeat(2, 1fr)", lg: "auto / repeat(3, 1fr)"}} gridGap={8}>
						{[...images.valid, ...images.invalid].map(({ name, url, format, valid, selected }, index) => (
							<GridItem key={index} border="0.25em solid" cursor="pointer" _hover={{
								borderColor: valid ? (selected ? 'blue.300' : 'gray.400') : 'red.300'
							}} borderColor={valid ? (selected ? 'blue.300' : 'gray.300') : 'red.300'} borderRadius="md">
								<Flex alignItems="center" justifyContent="center" w="full" height="20rem" backgroundColor="gray.100" onClick={() => valid && toggleImageSelected(index)}>
									{valid
										? <Image src={url} w="full" height="100%" objectFit="cover" objectPosition="center" alt="image" pointerEvents="none" userSelect="none" />
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
				)}

				{!isEmpty([...images.valid, ...images.invalid]) && !(isSubmitting || isLoading) && (
					<Flex mt={4} direction="column" background="blue.100" borderRadius="md" p={6} position="sticky" bottom={4}>
						<Heading size="md" color="blue.600">
							Loaded {images.valid.length + images.invalid.length} images ({images.valid.length} valid, {images.invalid.length} invalid, {selectedImages.length} selected)
						</Heading>
						{!isEmpty(images?.valid) && (
							<Flex gap="0.8rem" mt={4} flexFlow="row wrap">
								<Button w={{base: '100%', sm: 'calc(50% - 0.8rem)', md: 'calc(25% - 0.8rem)'}} disabled={selectedImages.length < 1} isLoading={isSubmitting || isLoading} colorScheme='blue' onClick={() => downloadSelectedImages('single')}>Download images</Button>
								<Button w={{base: '100%', sm: 'calc(50% - 0.8rem)', md: 'calc(25% - 0.8rem)'}} disabled={selectedImages.length < 1} isLoading={isSubmitting || isLoading} colorScheme='blue' onClick={() => downloadSelectedImages('zip')}>Download images (ZIP)</Button>
								<Button w={{base: '100%', sm: 'calc(50% - 0.8rem)', md: 'calc(25% - 0.8rem)'}} disabled={selectedImages.length === images.valid.length} isLoading={isSubmitting || isLoading} colorScheme='blue' onClick={() => {
									// select all 
									let newImages: any = { ...images };
									newImages.valid = newImages.valid.map((image: any) => ({ ...image, selected: true }));
									setImages(newImages);
								}}>Select all images</Button>
								<Button disabled={selectedImages.length < 1} w={{base: '100%', sm: 'calc(50% - 0.8rem)', md: 'calc(25% - 0.8rem)'}} isLoading={isSubmitting || isLoading} colorScheme='blue' onClick={() => {
									// select all 
									let newImages: any = { ...images };
									newImages.valid = newImages.valid.map((image: any) => ({ ...image, selected: false }));
									setImages(newImages);
								}}>Deselect all images</Button>
							</Flex>
						)}
					</Flex>
				)}
			</Flex>
			<Flex as="footer" alignItems="center" justifyContent="center" py={6}>
				<Text as="span">Created by <Link fontWeight={600} href="https://breakerino.me" target="_blank">Breakerino<chakra.span color="#4EACFF">.</chakra.span></Link></Text>
			</Flex>
		</Container>
	)
}

App.defaultProps = {};
App.displayName = 'App';

export default App;