//importamos elementos de react
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import react from 'react';

//importamos las funciones que traen informacion de la API
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';

//importamos componentes
import List from '../ListComponent/List';

//importamos el component Error
import Error from '../ErrorComponent/Error';

//importamos elementos externos
import { SliderBox } from 'react-native-image-slider-box';

//componente home
const Home = ({ navigation }) => {
  //con esto trabajaremos con las IMAGENES
  const [moviesImages, setMoviesImages] = useState();
  //con esto trabajaremos con las Peliculas
  const [popularMovies, setPopularMovies] = useState();
  //con este state trabajaremos con las series
  const [popularTv, setPopularTv] = useState();
  //con este este trabajaremos con las peliculas familiares
  const [familyMovies, setFamilyMovies] = useState();
  //con este trabajaremos con los documentales
  const [documentaryMovies, setDocumentaryMovies] = useState();
  //con este state usaremos el componente Activity Indicator
  const [loaded, setLoaded] = useState(false);

  const [error, setError] = useState(false);

  //almacenaremos todas las promesas en 1
  const getData = () => {
    return Promise.all([
      //obtenemos las peliculas mas recientes
      getUpcomingMovies(),
      //Con este metodo obtenemos las peliculas mas populares
      getPopularMovies(),
      //llamamos al metodo que invoca las series de TV
      getPopularTv(),
      //llamamos al metodo que invoca las peliculas familiares
      getFamilyMovies(),
      //obtiene los documentales
      getDocumentaryMovies(),
    ]);
  };
  //mejora el performance de la app
  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          //creamos un array que almacene las imagenes para ir mostrandolas
          const moviesImagesArray = [];
          upcomingMoviesData.forEach((movie) => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path
            );
          });

          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        }
      )
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  //aqui retorna los componentes
  return (
    <react.Fragment>
      {/* Contiene un ScrollView y un container para las imagenes de presentacion*/}
      {loaded && !error && (
        <ScrollView>
          {moviesImages ? (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimensiones.height / 1.5}
                dotStyle={styles.sliderStyle}
                autoplay={true}
                circleLoop={true}></SliderBox>
            </View>
          ) : null}
          {/* carrusel de peliculas polulares*/}
          {popularMovies ? (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}></List>
            </View>
          ) : null}
          {/* carrusel de Tv populares*/}
          {popularTv ? (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Tv Show"
                content={popularTv}></List>
            </View>
          ) : null}
          {/* carrusel de peliculas familiares*/}
          {familyMovies ? (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}></List>
            </View>
          ) : null}
          {/* carrusel de documentales*/}
          {documentaryMovies ? (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}></List>
            </View>
          ) : null}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </react.Fragment>
  );
};

const dimensiones = Dimensions.get('screen');

//aqui guardaremos los estilos
const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default Home;
