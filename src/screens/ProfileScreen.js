import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
} from "react-native";

import { ProfileStyles } from "../styles";
import Item from "../components/Item";
import Profile from "../components/Profile";
import {
  domainNa1,
  domainAmericas,
  getNameUrl,
  getRankUrl,
  getMatchUrlPrefix,
  getMatchUrlPostfix,
  queryPrefix,
  API_key,
} from "../constants";

function ProfileScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [profile, setProfile] = useState(null);
  const [ranks, setRanks] = useState(null);

  const fetchMatches = (res) => {
    return fetch(
      `${domainAmericas}${getMatchUrlPrefix}${res.puuid}${getMatchUrlPostfix}${queryPrefix}${API_key}`
    ).then((response) => response.json());
  };

  const fetchRanks = (res) => {
    console.log(`${domainNa1}${getRankUrl}${res.id}${queryPrefix}${API_key}`);
    return fetch(
      `${domainNa1}${getRankUrl}${res.id}${queryPrefix}${API_key}`
    ).then((response) => response.json());
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${domainNa1}${getNameUrl}${route.params.name}${queryPrefix}${API_key}`)
      .then((response) => response.json())
      .then((json) => {
        if (!json.puuid) {
          /* use accountid to check return status */
          setMatches([]);
          throw new Error(json.status.message);
        }
        setProfile(json);
        /* fetch both match and rank data */
        return Promise.all([fetchMatches(json), fetchRanks(json)]);
      })
      .then(([matchData, rankData]) => {
        console.log(rankData);
        console.log(matchData);
        setMatches(matchData.slice(0, 6));
        setRanks(rankData);
      })
      .catch((err) => Alert.alert("Search Error", err.message))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const ItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  return (
    isLoading ? (
      <ActivityIndicator
        style={{ marginTop: 16 }}
        size="large"
        color="#0000ff"
      />
    ) : (
      <FlatList
        ListHeaderComponent={profile && <Profile profile={profile} ranks={ranks}></Profile>}
        data={matches}
        renderItem={( {item} ) => <Item matchId={item} puuid={profile.puuid}></Item>}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  );
}

export default ProfileScreen;
