import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {analyzeNutrition} from './src/services/openaiService'; // Import function
import { parseNutritionFacts } from './src/services/parseNutritionFacts';
import NutritionTable from './src/components/NutritionTable';

const App = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nutritionFacts, setNutritionFacts] = useState<
    {Nutrient: string; Value: string}[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  // Function to select an image
  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, (response: any) => {
      if (response.didCancel || response.errorCode) {
        Alert.alert('User cancelled image picker');
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
        handleAnalyzeNutrition(response.assets[0].uri);
      }
    });
  };

  // Function to call the analyzeNutrition utility
  const handleAnalyzeNutrition = async (imageUri: string) => {
    if (!imageUri) {
      return;
    }

    setLoading(true);
    setNutritionFacts(null);

    const result = await analyzeNutrition(imageUri);
    setNutritionFacts(parseNutritionFacts(result));

    setLoading(false);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nutrition Facts Analyzer</Text>

        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.image} />
        )}

        <TouchableOpacity onPress={selectImage} style={styles.selectButton}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        )}
        {nutritionFacts && <NutritionTable data={nutritionFacts} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  selectButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  analyzeButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  nutritionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default App;
