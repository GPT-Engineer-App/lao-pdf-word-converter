import { useState } from "react";
import { Container, VStack, Heading, Text, Input, Button, Progress, useToast, Box, Textarea, IconButton } from "@chakra-ui/react";
import { FaFileUpload, FaDownload } from "react-icons/fa";

const Index = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedText, setConvertedText] = useState("");
  const toast = useToast();

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to convert.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    setProgress(30);

    // Simulate OCR processing and conversion
    setTimeout(() => {
      setProgress(60);
      // Simulate text extraction
      setConvertedText("ສະບາຍດີ, ນີ້ແມ່ນຂໍ້ຄວາມທີ່ໄດ້ຖອນອອກຈາກ PDF ທີ່ເປັນພາສາລາວ.");
      setProgress(100);
      setLoading(false);
    }, 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([convertedText], { type: "text/plain" });
    element.href = URL.createObjectURL(fileBlob);
    element.download = "converted.docx";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="full">
        <Heading as="h1" size="xl">
          Lao PDF to Word Converter
        </Heading>
        <Text>Upload your Lao PDF documents to convert them into editable Word files.</Text>

        <Box w="full" p={4} borderWidth="1px" borderRadius="lg">
          <Input type="file" accept=".pdf" onChange={handleFileChange} />
          <IconButton aria-label="Upload PDF" icon={<FaFileUpload />} mt={2} colorScheme="blue" onClick={handleUpload} isLoading={loading}>
            Upload
          </IconButton>
        </Box>

        {progress > 0 && <Progress hasStripe value={progress} w="full" size="lg" />}

        {convertedText && (
          <>
            <Textarea value={convertedText} readOnly h="200px" />
            <Button leftIcon={<FaDownload />} colorScheme="green" onClick={handleDownload}>
              Download Word File
            </Button>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
