import React,{useState,useEffect} from 'react'
import {StyleSheet,ScrollView} from 'react-native'

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
  Spinner,
} from 'native-base'



 import AsyncStorage from '@react-native-community/async-storage'
 import {useIsFocused} from '@react-navigation/native'

const Home =({navigation,route}) => { //props given by stacknavigator

  const [listofSeasons,setListOfSeasons]=useState([]) //empty array
  const [loading,setLoading] = useState(false)

  const isFocused = useIsFocused();

  const getList = async ()=>{
  setLoading(true)

  const storedValue=await AsyncStorage.getItem('@season_list')

  if(!storedValue){
  setListOfSeasons([])
  }
  else {
    const list =JSON.parse(storedValue);
    setListOfSeasons(list)
    setLoading(false)}
  }

  const list = JSON.parse(storedValue)
  setListOfSeasons(list)

  setLoading(false)
  }


  const deleteSeason= async (id) => {
    const newList = await listofSeasons.filter((list)=>list.id!== id)
    await AsyncStorage.setItem('@season_list',JSON.stringify(newList))
    setListOfSeasons(newList)
  }

  const markComplete = async (id) => {
    const newArr= listofSeasons.map((list)=> {
      if(list.id===id)
      {
        list.isWatched = !list.isWatched
      }
      return list
    })
    await AsyncStorage.setItem('@season_list',JSON.stringify(newArr))
    setListOfSeasons(newArr)
  }
  
  if(loading) {
    return (
      <Container style={styles.container}>
       <Spinner color="#00b7c2"></Spinner>
      </Container>
    )
  }

  useEffect(()=>{
    getList(); //loads every single time app starts
  },[isFocused]) //[] is a dependency

   
    return(
      <ScrollView contentContainerStyle={styles.container}>
        
        
        
        {listofSeasons.length == 0 ? (
          <Container style={styles.container}>
            <H1 style={styles.heading}>WatchList Is Empty</H1>
          </Container>
        ) : (
          <>
          <H1 style={styles.heading}>Next Series to watch</H1>
          <List>
          {listofSeasons.map((season)=>(
              <ListItem key={season.id} style={styles.listItem} noBorder>
              <Left>
                <Button danger style={styles.actionButton} 
                onPress={()=>deleteSeason(season.id)}>
                  <Icon name='trash' active></Icon>
                </Button>

                <Button danger style={styles.actionButton} 
                        onPress={()=>{
                          navigation.navigate('Edit',{season})
                        }}>
                  <Icon active name='edit' type='Feather'></Icon>
                </Button>

              </Left>

              <Body>
                <Title style={styles.seasonName}>{season.name}</Title>
                <Text note>{season.total}</Text>
              </Body>

              <Right>
               <CheckBox checked={season.isWatched} 
                         onPress={()=>markComplete(season.id)}></CheckBox>
              </Right>
            </ListItem>
          ))}



          </List>
          </>
        )}

        <Fab style={{backgroundColor:"blue"}}
        position="bottomRight"
        onPress={() => navigation.navigate('Add')}>
          <Icon name='add'></Icon>
        </Fab> 
        
        </ScrollView>
    )
                                                

export default Home;

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });