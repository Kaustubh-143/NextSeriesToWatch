import React,{useState} from 'react'
import {Text,StyleSheet,ScrollView} from 'react-native'

import {Container,
        Form,
        Item,
        Input,
        Button,
        H1} from 'native-base'
        
import shortid from 'shortid'
import Snackbar from 'react-native-snackbar'

import AsyncStorage from '@react-native-community/async-storage'

const Add =({navigation}) => {
  const [name,setName] = useState('')
  const [totalSeasons,setTotalSeasons]=useState('')

  const addToList = async () => {
    try {
      if(!name || ! totalSeasons){
        return Snackbar.show({
          text:"Please add both fields",
          color:"#FFFFFF",
          backgroundColor:"#000000",
        })
      }

      const seasonToAdd = {
        id : shortid.generate(),
        name : name,
        total : totalSeasons,
        isWatched : false,
      }

      const storedValue = await AsyncStorage.getItem('@season_list')
      const prevList =await JSON.parse(storedValue) //array from local storage

      if(!prevList) {
        const newList = [seasonToAdd] //newlist is an array
        //conversion of object to an array 41 line
        await AsyncStorage.setItem('@season_list',JSON.stringify(newList)) // add to the local storage
      }
      else{
        prevList.push(seasonToAdd)
        await AsyncStorage.setItem('@season_list',JSON.stringify(prevList)) // add to the local storage
      }

     navigation.navigate('Home')

    } catch (error) {
      console.warn(error)
    }
  }
    return(
        <Container style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow:1}}>
            <H1 style={styles.heading}>Add to watch List</H1>
            <Form>
              <Item rounded style={styles.formItem}>
                <Input placeholder="Season Name"
                style={{color:"#eee"}}
                value={name}
                onChangeText={(text)=> setName(text)}></Input>
              </Item>

              <Item rounded style={styles.formItem}>
                <Input placeholder="Total No. Of Seasons"
                style={{color:"#eee"}}
                value={totalSeasons}
                onChangeText={(text)=>setTotalSeasons(text)}></Input>
              </Item>
              <Button rounded block onPress={addToList} >
                <Text style={{color:"#eee", textAlign:'center'}}>ADD</Text>
              </Button>
            </Form>
          </ScrollView>
        </Container>
    )
}

export default Add;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });