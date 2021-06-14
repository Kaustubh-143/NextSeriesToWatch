import React,{useState,useEffect} from 'react'
import {ScrollView,StyleSheet} from 'react-native'
import {
  List,
  Text,
  ListItem,
  Left,
  Right,
  Button,
  Body,
  CheckBox,Title,
  H1,Fab,Icon,Subtitle,
  Container,
  Spinner,Form,Item,Input,
} from 'native-base'

 //fab only works with Icon
 import AsyncStorage from '@react-native-community/async-storage'
 import {useIsFocused, useScrollToTop} from '@react-navigation/native'


const Edit=({navigation,route}) => {

  const [name,setName]=useState('')
  const [totalSeasons,setTotalSeasons]=useState('')
  const [id,setId]=useState(null)

  const update =async ()=> {
    try {
      if(!name || ! totalSeasons){
        return Snackbar.show({
          text:"Please add both fields",
          color:"#FFFFFF",
          backgroundColor:"#000000",
        })
    } 
    
    const seasonToUpdate = {
      id,
      name,
      totalSeasons,
      isWatched: false,
    }

    const storedValue=await AsyncStorage.getItem('@season_list')
    const list =await JSON.parse(storedValue)

    list.map((singleSeason)=>{
      if (singleSeason.id===id) {
        singleSeason.name=name;
        singleSeason.totalSeasons=totalSeasons;
      }
      return singleSeason;
    })

    await AsyncStorage.setItem('@season_list',JSON.stringify(list))

    navigation.navigate('Home')
  } catch (error) {
      console.warn(error)
    }
  }

  useEffect(()=>{
    const {season} = route.params // params get access to parameters that are passed to edit
    const {id,name,totalSeasons} = season

    setId(id)
    setName(name)
    setTotalSeasons(totalSeasons)
  },[])
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
          <Button rounded block onPress={update} >
            <Text style={{color:"#eee", textAlign:'center'}}>Update</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
    )
}

export default Edit;

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