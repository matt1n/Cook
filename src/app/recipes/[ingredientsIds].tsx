import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Recipe } from "../components/Recipe";
import { useEffect, useState } from "react";
import { services } from "@/services";
import { Ingredients } from "../components/ingredients";

export default function Recipes(){
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
    const [recipes, setRecipes] = useState<RecipeResponse[]>([])
    const params = useLocalSearchParams<{ingredientsIds: string}>()
    const ingredientsIds = params.ingredientsIds.split(",")

    useEffect(() => {
        services.ingredients.findByIds(ingredientsIds).then(setIngredients)
    }, [])
    
    useEffect(() => {
        services.ingredients.findByIds(ingredientsIds).then(setIngredients)
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="arrow-back" size={32} onPress={()=> router.back()}/>
                <Text style={styles.title}>Ingredientes</Text>
                <Ingredients ingredients={ingredients}/>
                <FlatList 
                data={["1"]}
                keyExtractor={item=>item}
                renderItem={()=> <Recipe recipe={{name: "Omelete", image: "https://i.ytimg.com/vi/gY4YpCyxV4Q/sddefault.jpg", minutes: 10}}/>}/>
            </View>
        </View>
    )
}