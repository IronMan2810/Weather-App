import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';

export default function Hour_weather({lon, lat}) {
    const [data, setData] = useState();
    const [min_temp, setMinTemp] = useState(0);
    const [max_temp, setMaxTemp] = useState(0);
    const hours = 24
    useEffect(() => {
      (async () => {
          axios({
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly',
            params: {lat: lat, lon: lon, hours: hours},
            headers: {
                'X-RapidAPI-Key': 'f9b1643effmsh279fde709356ae0p1828f9jsn1b54b158f403',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
          })
          .then(res => {
              const dat = res.data.data
              console.log(dat);
              setData(dat)
              setMinTemp(dat[0].temp)
              setMaxTemp(dat[0].temp)
          })
          .catch(err => {
              console.dir(err);
          })
      })()
      
    }, [lat,lon])
    for (let i in data){
      let cur_temp = Math.round(data[i].temp)
      if  (cur_temp > max_temp){
        setMaxTemp(cur_temp)
      }
      else if (cur_temp < min_temp) {
        setMinTemp(cur_temp)
      }
    }
    function addZero(i) {
      if (i < 10) {i = "0" + i}
      return i;
    }
    function getTime(epoch) {
      const d = new Date(epoch)
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      return h + ":" + m;
    }
    const Item = ({ time, temp, icon }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{getTime(time)}</Text>
        <Image style={styles.iconWeather} source={{uri: "https://www.weatherbit.io/static/img/icons/"+icon+".png"}}></Image> 
        <Text style={styles.title}>{Math.round(temp)}°</Text>
      </View>
    );
    // if (data)
    //   // console.log(data[0].weather.icon);
    //   console.log("https://www.weatherbit.io/static/img/icons/"+data[0].weather.icon+".png");
    
    const renderItem = ({ item }) => (
      <Item style={styles.item} time={item.timestamp_local} temp={item.temp} icon={item.weather.icon}/>
    );
    return (
      <SafeAreaView style={styles.hourlyWeather}>
        <Text style={styles.minMaxText}>{`Min ${Math.round(min_temp)} °C / Max ${Math.round(max_temp)} °C`}</Text>
        <FlatList
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        numColumns={hours}
        data={data} 
        renderItem={renderItem} 
        scrollEnabled={true}
        keyExtractor={item => item.ts}/>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  minMaxText: {
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
    fontWeight: '500',
  },
  item: {
    marginRight: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  flatlist: {
    maxWidth: 240,
    overflowX: 'auto',
    position: 'relative'
  },
  iconWeather: {
    height: 32,
    width: 32
  },
  title: {
    color: 'white'
  },
  hourlyWeather: {
    alignItems: 'center'
  }
});