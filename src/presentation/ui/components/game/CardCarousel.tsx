import React, { useEffect, useRef } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useDI } from "../../../../di/DIContext";
import { useScreenSize } from "../../../../context/ScreenSizeContext";
import QuestionCard from "./QuestionCard";
import { observer } from "mobx-react-lite";

const CardCarousel = observer(() => {
  const { gameViewModel } = useDI();
  const { width, height } = useScreenSize();

  const ref = useRef<ICarouselInstance>(null);

  useEffect(() => {
    const currentIndex = ref.current?.getCurrentIndex();
    if (currentIndex !== gameViewModel.cardIndex) {
      ref.current?.scrollTo({
        index: gameViewModel.cardIndex,
        animated: true,
      });
    }
  }, [gameViewModel.cardIndex]);

  return (
    <Carousel
      ref={ref}
      defaultIndex={gameViewModel.cardIndex}
      width={width}
      height={height * 0.8}
      data={gameViewModel.questions}
      renderItem={({ item }) => (
        <QuestionCard
          key={item.id}
          question={item}
          toggleFavorite={gameViewModel.toggleFavorite}
        />
      )}
      loop={false}
      windowSize={3}
      onSnapToItem={(index) => {
        gameViewModel.setCardIndex(index);
      }}
    />
  );
});

export default CardCarousel;
