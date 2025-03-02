/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import CharacterViewer from "../components/three/CharacterViewer";
import CardView from "../components/three/CardView";
import { useIndexContext } from "../context/IndexProvider";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .character-style {
    height: 300px;
    width: 100vw;
  }
`;

const cardContainerStyle = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: relative;
`;

const cardStyle = css`
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
`;

const Home = (): JSX.Element => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const characterRef = useRef<HTMLDivElement | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [cardPositions, setCardPositions] = useState<
    { x: number; y: number }[]
  >([]);

  useEffect(() => {
    if (cardRefs.current.length > 0) {
      const newPositions = cardRefs.current.map((card) => {
        if (!card) return { x: 0, y: 0 };
        const rect = card.getBoundingClientRect();
        return { x: rect.left, y: rect.top };
      });
      setCardPositions(newPositions);
    }
  }, []);

  const { setSelectedIndex } = useIndexContext();

  const color = ["white", "red", "blue", "yellow", "green"];
  const handleCardClick = (index: number) => {
    setSelectedId(selectedId === index ? null : index);
    setSelectedIndex(index + 1);
  };

  return (
    <div css={containerStyle}>
      <div ref={characterRef} className="character-style">
        <CharacterViewer />
      </div>
      <div css={cardContainerStyle}>
        {Array.from({ length: 5 }).map((_, index) => {
          const isSelected = selectedId === index;
          const initialPosition = cardPositions[index] || { x: 0, y: 0 };
          let centerX = initialPosition.x;
          let centerY = initialPosition.y;
          if (characterRef.current) {
            const charRect = characterRef.current.getBoundingClientRect();
            centerX = charRect.left + charRect.width / 2 - 75;
            centerY = charRect.top + 150;
          }
          const translateX = isSelected ? centerX - initialPosition.x : 0;
          const translateY = isSelected ? centerY - initialPosition.y : 0;
          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              css={[
                cardStyle,
                css`
                  transform: translate(${translateX}px, ${translateY}px)
                    scale(${isSelected ? 1.2 : 1});
                  z-index: ${isSelected ? 100 : 1};
                `,
              ]}
              onClick={() => handleCardClick(index)}
            >
              <CardView color={color[index]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
