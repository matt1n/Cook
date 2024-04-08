import { ScrollView,} from "react-native";
import { styles } from "./styles";
import { Ingredient } from "../Ingredient";
import { services } from "@/services";

type Props = {
    ingredients: IngredientResponse[]
    selected: String[]
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

export function Ingredients({ingredients, selected, setSelected}: Props){
    function handleToggleSelection(value: string){
        if (selected.includes(value)) {
            return setSelected((state) => state.filter((item) => item !== value))
        }

        setSelected((state) => [...state, value])
    }
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {ingredients.map((item, index)=> 
            (<Ingredient 
            key={item.id} 
            name={item.name}
            image={`${services.storage.imagePath}/${item.image}`} 
            selected ={selected.includes(item.id)}
            onPress={()=> handleToggleSelection(item.id)} 
            />))}
        </ScrollView>
    )
}