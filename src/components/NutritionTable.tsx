import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DataTable, Text} from 'react-native-paper';

// Define the props type
interface NutritionTableProps {
  data: {Nutrient: string; Value: string}[];
}

const NutritionTable: React.FC<NutritionTableProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estimated Nutrition Facts</Text>
      <DataTable>
        {/* Table Header */}
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.column}>Nutrient</DataTable.Title>
          <DataTable.Title style={styles.column}>Value</DataTable.Title>
        </DataTable.Header>

        {/* Table Rows */}
        {data.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.column}>
              {item.Nutrient}
            </DataTable.Cell>
            <DataTable.Cell style={styles.column}>{item.Value}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#f1f1f1',
  },
  column: {
    flex: 1,
  },
});

export default NutritionTable;
