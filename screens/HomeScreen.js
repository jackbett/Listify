import { LinearGradient } from 'expo-linear-gradient';
import React, {useState, useEffect} from 'react';
import {  
    Text, 
    SafeAreaView,
    StyleSheet,
    TextInput
} from 'react-native';

function HomeScreen() {
    const [prompts, setPrompts] = useState(
        ['A song with the hardest drop', 'A song with the funniest lyrics', 'A song that makes you mad']
    );
    const [usedPrompts, setUsedPrompts] = useState([]);
    const [promptToDisplay, setPromptToDisplay] = useState(prompts[0]);
    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState('');
    const [displayInput, setDisplayInput] = useState('true');

    function onSubmit() {
        setResult(answer);
        alert(answer + ' was added to the playlist!');
        setUsedPrompts(promptToDisplay);
        setPrompts(prompts.slice(1));
    }

    useEffect(() => {
        if(prompts.length != 0) {
            setPromptToDisplay(prompts[0]);
        }
        else {
            setPromptToDisplay(['No more prompts today!']);
            setDisplayInput(false);
        }
    }, [prompts])

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{flex:1}}>
            <SafeAreaView>
                <Text style={styles.promptToDisplay}>
                    {promptToDisplay}
                </Text>
                {
                    displayInput && 
                    <TextInput style={styles.input} value={answer} onChangeText={setAnswer} onSubmitEditing={onSubmit}/>
                }
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    promptToDisplay: {
        color: "white",
        fontSize: 40,
        textAlign: "center"
    },
    text: {
        fontSize: 30,
        color: "white",
        textAlign: "center"
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "white",
        color: "white"
    }
});

export default HomeScreen;
