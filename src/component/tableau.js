import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import data from '../utilis/db.json';
import Tts from 'react-native-tts';
import TableauItem from './tableauItem';
import texte from '../constants/texte';
import Details from './detail';

const Tableau = () => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState({});

  const handleOpenDetail = (item) => {
    setSelectedWord(item);
    setDetailVisible(true);
  };

  const handleCloseDetail = () => {
    setDetailVisible(false);
    Tts.stop();
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalScroll}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.verticalScroll}
      >
        <>
          <TableauItem
            handleOpenDetail={handleOpenDetail}
            titre={texte.conson}
            data={data.consonnes}
            numberColumn={5}
          />
          <TableauItem
            handleOpenDetail={handleOpenDetail}
            titre={texte.lg_conson}
            data={data.combinaisonsConsonnes}
            numberColumn={5}
          />
          <TableauItem
            handleOpenDetail={handleOpenDetail}
            titre={texte.voyel}
            data={data.voyellesCourtes}
            numberColumn={6}
          />
          <TableauItem
            handleOpenDetail={handleOpenDetail}
            titre={texte.lg_voyel}
            data={data.voyellesLongues}
            numberColumn={5}
          />

          {detailVisible && (
            <Details
              detailVisible={detailVisible}
              handleOpenDetail={handleOpenDetail}
              handleCloseDetail={handleCloseDetail}
              selectedWord={selectedWord}
            />
          )}
        </>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalScroll: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  verticalScroll: {
    flexGrow: 1,
  },
});

export default Tableau;
