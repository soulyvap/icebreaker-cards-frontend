import React from "react";
import { Pressable, Animated } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface FavoriteButtonProps {
  isFavorite: boolean; // ✅ Controlled state from parent
  onToggle: (newState: boolean) => void; // ✅ Callback when toggled
  size?: number;
  color?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
  size = 30,
  color = "red",
}) => {
  const scaleAnim = new Animated.Value(1); // ✅ Animation for smooth effect

  const handlePress = () => {
    onToggle(!isFavorite); // ✅ Toggle state in the parent component

    // ✅ Smooth scale animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <HeartIcon
          name={isFavorite ? "favorite" : "favorite-border"}
          size={size}
          color={isFavorite ? color : "gray"}
        />
      </Animated.View>
    </Pressable>
  );
};

const HeartIcon = styled(Icon)`
  transition: color 0.2s ease-in-out;
`;

export default FavoriteButton;
