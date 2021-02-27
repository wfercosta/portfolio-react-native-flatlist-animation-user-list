import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, StatusBar, Animated} from 'react-native';
import * as faker from 'faker';

const data = [...Array(30)].map((_, index) => ({
  id: `${index}`,
  avatar: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
    'men',
    'women',
  ])}/${index}.jpg`,
  name: faker.name.findName(),
  jobTitle: faker.name.jobTitle(),
  email: faker.internet.email(),
}));

export default () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  scrollY.addListener(({value}) => {
    console.log('ScrollY: ', value);
  });

  return (
    <View style={styles.container}>
      <Image
        source={{uri: BG_IMAGE}}
        style={StyleSheet.absoluteFill}
        blurRadius={10}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        renderItem={({item, index}) => {
          const scale = scrollY.interpolate({
            inputRange: [-1, 0, SIZE_ITEM * index, SIZE_ITEM * (index + 2)],
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: [-1, 0, SIZE_ITEM * index, SIZE_ITEM * (index + 1)],
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                ...styles.card,
                transform: [{scale}],
                opacity,
              }}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
              <View style={styles.cardDetails}>
                <Text style={styles.cardDetailsName}>{item.name}</Text>
                <Text style={styles.cardDetailsJobTitle}>{item.jobTitle}</Text>
                <Text style={styles.cardDetailsEmail}>{item.email}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const BG_IMAGE =
  'https://images.freeimages.com/images/large-previews/8a1/small-waterfall-1376352.jpg';

const SIZE_AVATAR = 70;
const SIZE_SPACING = 20;
const SIZE_ITEM = SIZE_AVATAR + SIZE_SPACING * 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    padding: SIZE_SPACING,
    paddingTop: StatusBar.currentHeight || 42,
  },
  avatar: {
    width: SIZE_AVATAR,
    height: SIZE_AVATAR,
    borderRadius: SIZE_AVATAR,
    marginRight: SIZE_SPACING / 2,
  },
  card: {
    flexDirection: 'row',
    padding: SIZE_SPACING,
    marginBottom: SIZE_SPACING,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  cardDetails: {},
  cardDetailsName: {
    fontSize: 22,
    fontWeight: '700',
  },
  cardDetailsJobTitle: {
    fontSize: 18,
    opacity: 0.7,
    overflow: 'hidden',
  },
  cardDetailsEmail: {
    fontSize: 14,
    opacity: 0.8,
  },
});
