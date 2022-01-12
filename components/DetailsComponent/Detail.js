import React, { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  Pressable,
} from 'react-native';
import dateFormat from 'dateformat';
import StarRating from 'react-native-star-rating';
import { getMovie } from '../services/services';
import PlayButton from '../PlayBotton/PlayButton';
import Video from '../VideoComponent/Video';

const Detail = ({ route, navigation }) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then((movieData) => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  //esta funcion dara Play al boton
  const videoShow = () => {
    setModalVisible(!modalVisible);
  };
  
  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeHolderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                {/*Esta funcion dara funcionalidad al boton de play para poder reproductir el video*/}
                <PlayButton handlePress={videoShow} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map((genre) => {
                    return (
                      <Text style={styles.styleGenre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <Text style={styles.rating}>
                {'Rating: ' + movieDetail.vote_average}
              </Text>

              <Text style={styles.overview}>{movieDetail.overview}</Text>

              <Text style={styles.release}>
                {'Release Date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}></View>
           <Video onClose={videoShow} />
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

//si no recibimos imagen del API tendremos imagenes en el placeHolder
const placeHolderImage = require('../../assets/images/VideoNotFound.png');

//con esto obtendremos las dimensiones de la pantalla
const dimensiones = Dimensions.get('screen').height;

//aqui guardaremos los estilos
const styles = StyleSheet.create({
  image: {
    height: dimensiones / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
  },
  styleGenre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  rating: {
    fontWeight: 'bold',
    paddingTop: 5,
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'centerF',
  },
});

export default Detail;
