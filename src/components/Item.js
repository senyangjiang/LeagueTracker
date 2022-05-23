import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { getStatsUrl, queryPrefix, API_key, domainAmericas } from "../constants";
import { ProfileStyles } from "../styles";

const championSqaureAssetPath = "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/";

const Item = ({ matchId, puuid }) => {
  const [stats, setStats] = useState(null);
  const [win, setWin] = useState(null);
  const [champion, setChampion] = useState(null);
  useEffect(() => {
    fetch(`${domainAmericas}${getStatsUrl}${matchId}${queryPrefix}${API_key}`)
      .then((res) => res.json())
      .then((json) => {
        json.info.participants.forEach((p) => {
          if (p.puuid == puuid) {
            setStats({
              kills: p.kills,
              deaths: p.deaths,
              assists: p.assists,
            });
            setWin(p.win);
            setChampion(p.championName);
          }
        });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <TouchableOpacity style={ProfileStyles.item} activeOpacity={0.5}>
      {win !== null ? (
        <View
          style={{
            backgroundColor: win ? "#245ab3" : "#38372d",
            width: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {win ? "W" : "L"}
          </Text>
        </View>
      ) : null}
      <View style={{margin: 10}}>
        <Image
          source={{ uri: `${championSqaureAssetPath}${champion}.png` }}
          style={{ width: 50, height: 50, borderRadius: 20 }}
        ></Image>
      </View>
      <View style={{justifyContent: "center", left: 10}}>
        {stats ? (
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {stats.kills + " / " + stats.deaths + " / " + stats.assists}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Item;
