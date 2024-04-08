import { Alert, Text, View } from "react-native";

import {services} from "@/services"

import { styles } from "./styles";
import { Ingredients } from "../components/ingredients";
import { useState, useEffect } from "react";
import { Selected } from "../components/Selected";
import { router } from "expo-router";

export default function Index(){
    const [selected, setSelected] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

    function handleClearSelected(){
        Alert.alert("Limpar", "Deseja limpar tudo?", [
            {text: "Não", style: "cancel"},
            {text: "Sim", onPress: () => setSelected([])}
        ])
        
    }

    function handleSearch(){
        router.navigate("/recipes/" + selected)
    }

    useEffect(()=> {
        services.ingredients.findAll().then(setIngredients)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Escolha {"\n"}
                <Text style={styles.subtitle}>os produtos</Text>
            </Text>
            <Text style={styles.message}>Descubra receitas baseadas nos produtos que escolheu</Text>
            <Ingredients ingredients={ingredients} selected={selected} setSelected={setSelected}></Ingredients>
            {selected.length > 0 && (<Selected quantity={selected.length} onClear={handleClearSelected} onSearch={handleSearch}/>)}
        </View>
    )
}