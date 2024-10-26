import { SafeAreaView, Text, View, StyleSheet, Image, ScrollView, StatusBar, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useState } from 'react';
import { Colors } from "@/constants/Colors";
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
      <HomepageStack />
  );
}

function HomepageStack() {
  const [allItems, setAllItems] = useState([]);
  const Navigation = useNavigation();

  useEffect(() => {
    Navigation.navigate("Home")
  }, [allItems])

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomePage} initialParams={{setAllItems, allItems}} />
      <Stack.Screen name="AddItem" component={AddItem} options={{presentation: "modal"}} initialParams={{setAllItems, allItems}} />
      <Stack.Screen name="EditItem" component={EditItem} options={{presentation: "modal"}} initialParams={{setAllItems, allItems}} />
    </Stack.Navigator>
  )
}

function AddItem({route, navigation}) {
  const {image, setAllItems, allItems} = route.params;
  const [brand, setBrand] = useState("")
  const [name, setName] = useState("")
  const [cats, setCats] = useState([{name: "Tops", active: true}, {name: "Bottoms", active: false}, {name: "Shoes", active: false}, {name: "Accessories", active: false}]);
  const [seasons, setSeasons] = useState([{name: "Spring", active: true}, {name: "Summer", active: false}, {name: "Autumn", active: false}, {name: "Winter", active: false}]);
  const id = Math.floor(Math.random() * 999);

  const handleSubmit = () => {
    setAllItems([...allItems, {id, image, name, brand, cats, seasons}])
  }

  const changeCat = (name) => {
    const updatedCats = cats;

    setCats(updatedCats.map((cat) => {
      cat.active = cat.name == name;

      return cat;
    }))
  }

  const changeSeason = (name) => {
    const updatedSeasons = seasons;

    setSeasons(updatedSeasons.map((season) => {
      season.active = season.name == name;

      return season;
    }))
  }

  return (
    <View style={{padding: 40, alignItems: "center", flex: 1}}>
      <View style={{backgroundColor: "rgba(0,0,0,0.04)", padding: 20, borderRadius: 10, marginBottom: 50}}>
        <Image source={{uri: image}} style={{width: 170, height: 170}} />
      </View>

      <Text style={styles.inputTitle}>Item name</Text>
      <TextInput
        style={styles.input}
        placeholder="Athletic T-Shirt"
        placeholderTextColor={Colors.lightGrey}
        onChangeText={(val) => setName(val)}
      />

      <View style={{height: "40%", width: "100%"}}>

      <Text style={styles.inputTitle}>Brand</Text>
      <TextInput
        style={styles.input}
        placeholder="Adidas"
        placeholderTextColor={Colors.lightGrey}
        onChangeText={(val) => setBrand(val)}
      />

      <Text style={styles.inputTitle}>Category</Text>
      <ScrollView style={styles.filters} horizontal showsHorizontalScrollIndicator={false}>
        {cats.map((cat) => (
          <TouchableOpacity style={[styles.filter, styles.category, cat.active && styles.active]} onPress={() => changeCat(cat.name)}>
            <Text style={[styles.filterTitle, cat.active && styles.active]}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.inputTitle}>Season</Text>
      <ScrollView style={styles.filters} horizontal showsHorizontalScrollIndicator={false}>
        {seasons.map((season) => (
          <TouchableOpacity style={[styles.filter, styles.category, season.active && styles.active]} onPress={() => changeSeason(season.name)}>
            <Text style={[styles.filterTitle, season.active && styles.active]}>{season.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>

      <TouchableOpacity style={{backgroundColor: "#000", width: "100%", borderRadius: 15, height: 60, alignItems: "center", justifyContent:"center", position: "absolute", bottom: 60}} onPress={() => handleSubmit()}>
        <Text style={{color: "#fff", fontWeight: "500", fontSize: 18}}>Add to Wardrobe</Text>
      </TouchableOpacity>
    </View>
  )
}

function EditItem({route, navigation}) {
  const {id, image, initName, initBrand, initCats, initSeasons, setAllItems, allItems} = route.params;
  const [brand, setBrand] = useState(initBrand)
  const [name, setName] = useState(initName)
  const [cats, setCats] = useState(initCats);
  const [seasons, setSeasons] = useState(initSeasons);

  const handleEdit = () => {
    const newItemsArr = allItems;

    setAllItems(newItemsArr.map((item) => {
      if (item.id === id) {
        item.name = name;
        item.brand = brand;
        item.cats = cats;
        item.seasons = seasons;
      }

      return item;
    }))
  }

  const changeCat = (name) => {
    const updatedCats = cats;

    setCats(updatedCats.map((cat) => {
      cat.active = cat.name == name;

      return cat;
    }))
  }

  const changeSeason = (name) => {
    const updatedSeasons = seasons;

    setSeasons(updatedSeasons.map((season) => {
      season.active = season.name == name;

      return season;
    }))
  }

  return (
    <View style={{padding: 40, alignItems: "center", flex: 1}}>
      <View style={{backgroundColor: "rgba(0,0,0,0.04)", padding: 20, borderRadius: 10, marginBottom: 50}}>
        <Image source={{uri: image}} style={{width: 170, height: 170}} />
      </View>

      <Text style={styles.inputTitle}>Item name</Text>
      <TextInput
        style={styles.input}
        placeholder="Athletic T-Shirt"
        placeholderTextColor={Colors.lightGrey}
        onChangeText={(val) => setName(val)}
        defaultValue={initName}
      />

      <View style={{height: "40%", width: "100%"}}>

      <Text style={styles.inputTitle}>Brand</Text>
      <TextInput
        style={styles.input}
        placeholder="Adidas"
        placeholderTextColor={Colors.lightGrey}
        onChangeText={(val) => setBrand(val)}
        defaultValue={initBrand}
      />

      <Text style={styles.inputTitle}>Category</Text>
      <ScrollView style={styles.filters} horizontal showsHorizontalScrollIndicator={false}>
        {cats.map((cat) => (
          <TouchableOpacity style={[styles.filter, styles.category, cat.active && styles.active]} onPress={() => changeCat(cat.name)}>
            <Text style={[styles.filterTitle, cat.active && styles.active]}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.inputTitle}>Season</Text>
      <ScrollView style={styles.filters} horizontal showsHorizontalScrollIndicator={false}>
        {seasons.map((season) => (
          <TouchableOpacity style={[styles.filter, styles.category, season.active && styles.active]} onPress={() => changeSeason(season.name)}>
            <Text style={[styles.filterTitle, season.active && styles.active]}>{season.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>

      <TouchableOpacity style={{backgroundColor: "#000", width: "100%", borderRadius: 15, height: 60, alignItems: "center", justifyContent:"center", position: "absolute", bottom: 60}} onPress={() => handleEdit()}>
        <Text style={{color: "#fff", fontWeight: "500", fontSize: 18}}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  )
}

function HomePage({route, navigation}) {
  const [itemImage, setItemImage] = useState([]);
  const {allItems} = route.params;
  const [filters, setFilters] = useState([{name: "All", active: true}, {name: "Tops", active: false}, {name: "Bottoms", active: false}, {name: "Shoes", active: false}, {name: "Accessories", active: false}]);

  const changeFilter = (name) => {
    const updatedFilters = filters;

    setFilters(updatedFilters.map((filter) => {
      filter.active = filter.name == name;

      return filter;
    }))
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setItemImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    navigation.navigate("AddItem", {image: itemImage})
  }, [itemImage])

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems: "center"}}>
        <SafeAreaView style={{marginVertical: 10, width: "85%"}}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>

            {/* <TouchableOpacity>
              <Image source={require("../assets/images/avatar.png")} style={styles.avatar} />
            </TouchableOpacity> */}
          </View>
          
          <Text style={styles.heading}>
            Hey Samy!
          </Text>

          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Your Outfits of the Day</Text>
              <TouchableOpacity><Feather name="bookmark" size={24} color="black" /></TouchableOpacity>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.sectionSubtitle}>Today's Perfect Looks, Handpicked for You</Text>
            </View>

            <View style={styles.outfit}>
              <Image source={require("../assets/images/outfit.png")} style={styles.outfitImage} /> 
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Wardrobe</Text>

              <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={{...styles.addItemButton, marginRight: 10, backgroundColor: "#fff", borderWidth: 2}}>
                  <Feather name="plus" size={15} color="#000" style={{marginRight: 5}} />
                  <Text style={{color: "#000", fontSize: 15, fontWeight: "600"}}>Outfit</Text>
                </TouchableOpacity >

                <TouchableOpacity style={styles.addItemButton} onPress={() => pickImage()}>
                  <Feather name="plus" size={15} color="#fff" style={{marginRight: 5}} />
                  <Text style={{color: "#fff", fontSize: 15, fontWeight: "500"}}>Item</Text>
                </TouchableOpacity >
              </View>
            </View>

            <Text style={styles.sectionSubtitle}>All Your Styles in One Place</Text>
            
            <ScrollView style={styles.filters} horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={{justifyContent: "center", marginRight: 20}}>
                <Feather name="sliders" size={25} color="black" />
              </TouchableOpacity>

              {filters.map((filter) => (
                <TouchableOpacity style={[styles.filter, filter.active && styles.active]} onPress={() => changeFilter(filter.name)}>
                  <Text style={[styles.filterTitle, filter.active && styles.active]}>{filter.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.clothes}>
              

              {allItems && allItems.toReversed().map((item) => {
                let itemInCat = false;

                if (itemInCat) {
                  console.log("FOUND!")
                }

                item.cats.forEach((cat) => {
                  filters.forEach((filter) => {
                    if ((cat.name === filter.name && cat.active && filter.active) || filters[0].active) {
                      itemInCat = true;
                    }
                  })
                })

                if (itemInCat) {
                  return (
                    <TouchableOpacity style={styles.item} key={item.id} onPress={() => navigation.navigate("EditItem", {id: item.id, image: item.image, initName: item.name, initBrand: item.brand, initCats: item.cats, initSeasons: item.seasons})}>
                      <View style={styles.itemImageContainer}>
                        <Image source={{uri: item.image}} style={styles.itemImage} /> 
                      </View>

                      <Text style={styles.itemTitle}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                }
              })}
            </View>
          </View>
        </SafeAreaView>

        <View style={{marginVertical: 30}}></View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 7
  },
  heading: {
    fontSize: 32,
    fontWeight: "700"
  },
  section: {
    marginVertical: 30
  },
  sectionTitleContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "500",
  },
  sectionSubtitle: {
    fontSize: 18,
    color: Colors.lightGrey,
    marginRight: 15,
    marginBottom: 20
  },
  outfit: {
    width: "100%",
    height: 455,
    // height: 500,
    backgroundColor: "rgba(0,0,0,0.08)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  outfitImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 0.8,
  },
  filters: {
    overflow: "visible",
    marginBottom: 20,
  },
  filter: {
    marginRight: 20,
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterTitle: {
    fontSize: 20,
  },
  category: {
    borderRadius: 15,
    marginRight: 15,
    alignSelf: "flex-start"
  },
  active: {
    backgroundColor: "#000",
    color: "#fff"
  },
  addItemButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 30
  },
  clothes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  item: {
    width: "46%",
    marginBottom: 20
  },
  itemImageContainer: {
   width: "100%",
    height: 210,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  itemImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 0.8,
  },
  itemTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500"
  },
  inputTitle: {
    width: "100%",
    fontSize: 17,
    fontWeight: "400",
    marginBottom: 15
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    fontSize: 15,
    padding: 10,
    borderRadius: 10,
    color : "#000",
    paddingHorizontal: 25,
    marginBottom: 20,
  },
});