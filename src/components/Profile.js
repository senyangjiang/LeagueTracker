import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ProfileStyles } from "../styles";
import { RankBadges } from "../../assets";

const iconPath =
  "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/";

const rankMap = {
  'I': '1',
  'II': '2',
  'III': '3',
  'IV': '4',
}

const Profile = ({ profile, ranks }) => {
  const iconId = profile.profileIconId;

  let rankSoloTier = 'Unranked';
  let rankFlexTier = 'Unranked';
  let rankSoloRank = null;
  let rankFlexRank = null;

  ranks.forEach(r => {
    if (r.queueType === "RANKED_SOLO_5x5") {
      rankSoloTier = `${r.tier.slice(0,1)}${r.tier.slice(1).toLowerCase()}`;
      rankSoloRank = rankMap[r.rank];
    } else if (r.queueType === "RANKED_FLEX_SR") {
      rankFlexTier = `${r.tier.slice(0,1)}${r.tier.slice(1).toLowerCase()}`;
      rankFlexRank = rankMap[r.rank];
    }
  });

  return (
    <View style={{width: '100%'}}>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <View style={{margin: 10}}>
          <Image
            source={{ uri: `${iconPath}${iconId}.png` }}
            style={ProfileStyles.icon}/>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={ProfileStyles.summonerName}>{profile.name}</Text>
        </View>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', borderColor: '#747982', borderWidth: 1, borderRadius: 5, margin: 5}}>
          <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={RankBadges[rankSoloTier]} style={ProfileStyles.rankBadge}></Image>
          </View>
          <View style={{width: 180, flexDirection: 'column', justifyContent: 'space-evenly'}}>
            <Text> Ranked Solo/Duo</Text>
            <Text style={ProfileStyles.header}>
              {rankSoloTier} {rankSoloRank}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', borderColor: '#747982', borderWidth: 1, borderRadius: 5, margin: 5}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={RankBadges[rankFlexTier]} style={ProfileStyles.rankBadge}></Image>
            </View>
            <View style={{width: 200, flexDirection: 'column', justifyContent: 'space-evenly'}}>
              <Text> Ranked Flex</Text>
              <Text style={ProfileStyles.header}>
                {rankFlexTier} {rankFlexRank}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
