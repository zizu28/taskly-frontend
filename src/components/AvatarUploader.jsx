import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Center, Image, Tooltip, Input, Text, VStack } from "@chakra-ui/react";

const AvatarUploader = ({ imageUrl, onFieldChange, setFiles }) => {
  const convertFileToUrl = (file) => URL.createObjectURL(file);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
  });

  return (
    <Center {...getRootProps()}>
      <Input {...getInputProps()} id="avatar" cursor={"pointer"} />
      <VStack gap={5}>
        {isDragActive ? (
          <Text>Drop the files here</Text>
        ) : (
          <Text>Drag 'n' drop some files here, or click to select files</Text>
        )}
        <Tooltip label="Change your avatar">
          <Image
            src={imageUrl}
            alt="Profile picture"
            rounded="full"
            boxSize="150px"
            objectFit="cover"
            h={24}
            w={24}
            cursor={"pointer"}
            mt={2}
          />
        </Tooltip>
      </VStack>
    </Center>
  );
};

export default AvatarUploader;
