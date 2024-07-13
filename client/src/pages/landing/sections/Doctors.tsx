import styled from "styled-components";
import {
  StyledFacilitiesContainer,
  StyledFlexWrapper,
  StyledGrid,
  StyledH2,
  StyledH3,
  StyledWrapCenter,
} from "../common/styles";
import { useState } from "react";

const StyledTabs = styled.div`
  margin: 0 auto 40px;
  text-align: left;

  ul {
    @media (max-width: 768px) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  li {
    background-color: #fff;
    border: 1px solid #cdcdcd;
    cursor: pointer;
    font: 400 12px / 30px "Open Sans", sans-serif;
    padding: 0 13px;
    position: relative;
    overflow: visible;
    margin: 10px 8px 0 0;
    display: inline-block;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    color: #888;
    font: 600 12px / 29px "Open Sans", sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;

    &.active {
      background-color: #4accd1;
      border: 1px solid #4accd1;
      color: #fff;
    }
  }
`;

const StyledTabsContent = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    li {
      min-width: 255px;
      text-align: center;
      transition: opacity 0.5s ease, top 0.5s ease !important;

      @media (max-width: 768px) {
        width: 100%;
      }

      h3 {
        color: #3fbbc0;
        font: 700 17px "Open Sans", sans-serif;
        text-decoration: none;
        display: block;
        text-align: center;
        margin-bottom: 3px;
      }

      span {
        font: italic 400 16px "Open Sans", sans-serif;
        color: #888888;
        text-align: center;
        font-style: normal;
      }
    }
  }
`;

const StyledDoctorImage = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`;

type DoctorEntityType = Array<{
  name: string;
  specialization: string;
  image: string;
}>;
export const DoctorsSection = ({ doctors }: { doctors: DoctorEntityType }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const categories = [
    // @ts-ignore
    ...new Set(["All", ...doctors.map((doctor) => doctor.specialization)]),
  ];

  function onCategoryClickHandler(category: string) {
    setActiveCategory(category.toLocaleLowerCase());
  }

  return (
    <section className="grey" id="doctors">
      <StyledGrid>
        <StyledWrapCenter>
          <StyledFlexWrapper>
            <StyledFacilitiesContainer>
              <StyledH2>Our Doctors</StyledH2>
              <StyledH3>
                Ea melius ceteros oportere quo, pri habeo viderer facilisi ei
              </StyledH3>
              <StyledTabs>
                <ul>
                  {categories.map((category) => {
                    return (
                      <li
                        onClick={() => onCategoryClickHandler(category)}
                        key={category}
                        className={
                          activeCategory === category.toLowerCase()
                            ? "active"
                            : ""
                        }
                      >
                        {category}
                      </li>
                    );
                  })}
                </ul>
              </StyledTabs>
              <StyledTabsContent>
                <ul>
                  {doctors
                    .filter((item) => {
                      if (activeCategory === "all") {
                        return item;
                      }
                      return (
                        item.specialization?.toLowerCase() === activeCategory
                      );
                    })
                    .map((doctor) => {
                      return (
                        <li key={doctor.name}>
                          <StyledDoctorImage>
                            <img src={doctor.image} alt="" />
                          </StyledDoctorImage>
                          <h3>{doctor.name}</h3>
                          <span>{doctor.specialization}</span>
                        </li>
                      );
                    })}
                </ul>
              </StyledTabsContent>
            </StyledFacilitiesContainer>
          </StyledFlexWrapper>
        </StyledWrapCenter>
      </StyledGrid>
    </section>
  );
};
