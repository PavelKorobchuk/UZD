import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import logo from "../../assets/logo.png";
import bg1 from "../../assets/bg1.jpg";

import {
  StyledFacilitiesContainer,
  StyledFlexWrapper,
  StyledGrid,
  StyledH2,
  StyledH3,
  StyledWrapCenter,
} from "./common/styles";
import { DoctorsSection } from "./sections/Doctors";

const StyledCall = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;

  & > div.divider {
    height: 100%;
    width: 1px;
    background: #fff;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const StyledWorkingTime = styled.span``;

const StyledTopPanel = styled.div`
  background-color: #3fbbc0;
  color: #fff;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const StyledBottomPanel = styled.div`
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 15px 0;
`;

const StyledLogo = styled.div`
  height: 50px;
  img {
    height: 100%;
  }
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

interface StyledNavProps {
  open: boolean;
}

const StyledNav = styled.nav<StyledNavProps>`
  display: flex;
  @media (max-width: 768px) {
    top: 0;
    position: absolute;
    width: 100%;
    background: #fff;
    display: ${({ open }) => (open ? "flex" : "none")};
  }

  ul {
    display: flex;
    @media (max-width: 768px) {
      padding: 15px;
    }

    li {
      padding: 15px;
      a {
        font-size: 13px;
        letter-spacing: 1px;
        color: #666;
        text-transform: uppercase;
        font-weight: 700;
        text-decoration: none;
      }
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
  }
`;

const StyledMainBanner = styled.div`
  background: url(${bg1}) no-repeat top center;
  padding: 100px 0 60px;
`;

const StyledBannerLeft = styled.div`
  h2 {
    margin: 0 0 30px;
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    color: #444;
    line-height: 1em;
    font-size: 36px;
  }

  h4 {
    font-size: 28px;
    margin: 0 0 30px;
  }
`;

const StyledBannerRight = styled.div`
  h2 {
    margin: 0 0 30px;
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    color: #444;
    line-height: 1em;
    font-size: 36px;
  }

  h4 {
    font-size: 28px;
  }
`;

const StyledFacilities = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: none;
  border: none;
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  border-radius: 4px;

  ul {
    li {
      margin: 0 0 20px 0;
      line-height: 1.6em;
      display: flex;
      flex-direction: column;
      position: relative;
      color: #666;
      font-size: 16px;

      span:first-child {
        position: absolute;
        color: #7db53b;
        font-size: 45px;
      }

      span:nth-child(2) {
        font-weight: 700;
        margin-left: 55px;
      }

      span:nth-child(3) {
        margin-left: 55px;
      }
    }
  }
`;

const StyledServiceList = styled.div`
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: space-around;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  li {
    margin-bottom: 25px;

    span:first-child {
      color: #7db53b;
      position: absolute;
    }

    span:nth-child(2) {
      margin-left: 40px;
      display: block;
      font-weight: 700;
      margin-bottom: 5px;
      color: #666;
      font-size: 16px;
    }

    span:nth-child(3) {
      margin-left: 40px;
      display: block;
      font-weight: 300;
      color: #666;
    }
  }
`;

const StyledFooter = styled.div`
  padding: 50px 0 0;
  background-color: #f2f2f2;
`;

const StyledFooterContent = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const StylefFooterCol = styled.div`
  padding: 15px 20px;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    text-transform: uppercase;
    margin: 0 0 30px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: #444;
    line-height: 1em;
  }

  p {
    margin: 0 0 20px;
  }

  .company-social {
    display: flex;

    li {
      margin: 0 5px 0 0;
    }
  }

  .company-social a i {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    transition: background 0.3s ease-in-out;
    text-align: center;
    border-radius: 3px;
    padding: 0;
  }

  .company-social .social-twitter a i {
    background: #62c6f8;
  }
  .company-social .social-facebook a i {
    background: #3873ae;
  }

  .company-social .social-google a i {
    background: #000;
  }

  .company-social .social-vimeo a i {
    background: #51a6d3;
  }

  .company-social .social-dribble a i {
    background: #d74980;
  }
`;

const StyledSubFooter = styled.div`
  background-color: #f7f7f7;
  border-top: 1px solid #ddd;
  padding: 30px 0 10px;
`;

const StyledFlexContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0;
`;

const StyledGoogleMap = styled.div`
  padding: 40px 0;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledMain = styled.main`
  section.white {
    background-color: #fff;
  }

  section.grey {
    background-color: #f2f2f2;
  }
`;

const StyledFooterContacts = styled.p`
  display: flex;
  flex-direction: row;
`;

const StyledFooterContactsWrapper = styled.p`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Burger = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  z-index: 20;

  div {
    width: 100%;
    height: 4px;
    background: #333;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledRelativeDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DOCTORS = [
  {
    name: "Doctor 1",
    specialization: "кардіологія",
    image: "../../assets/img-3.png",
  },
  {
    name: "Doctor 2",
    specialization: "психотерапія",
    image: "../../assets/img-3.png",
  },
  {
    name: "Doctor 3",
    specialization: "нейрологія",
    image: "../../assets/img-3.png",
  },
  {
    name: "Doctor 4",
    specialization: "нейрологія",
    image: "../../assets/img-3.png",
  },
  {
    name: "Doctor 5",
    specialization: "психотерапія",
    image: "../../assets/img-3.png",
  },
];

const SERVICES = [
  {
    title: "Ультразвукова діагностика дорослих та дітей",
    description: "Опис послуги 1",
  },
  {
    title: "Нейросонографія (НСГ), Ехо КС ( УЗД серця )",
    description: "Опис послуги 1",
  },
  {
    title: "Дуплекс судин шиї та голови",
    description: "Опис послуги 1",
  },
  {
    title: "Консультації спеціалістів",
    description:
      "Гастроентеролог, гінеколог, отоларинголог (ЛОР дорослих та дітей), невролог, кардіолог. ЛОР процедури",
  },
  {
    title: "Аналізи (лабораторія Діла)",
    description: "",
  },
  {
    title: "Дуплекс артерій та вен верхніх та нижніх кінцівок",
    description: "Опис послуги 1",
  },
  {
    title: "УЗД органів черевної порожнини",
    description: "Опис послуги 1",
  },
  {
    title: "Нирок та сечового міхура",
    description: "Опис послуги 1",
  },
  {
    title: "Холтер",
    description:
      "Холтер ЕКГ 24, 48 годин дітям та дорослим, Холтер артеріального тиску 24, 48 годин. Електрокардіограмма (ЕКГ) з розшифруванням дітей та дорослих",
  },
  {
    title: "Холтер 2",
    description:
      "Ендоскопічні обстеження вуха, горла , носа у дорослих та дітей. Ендоскопічні обстеження шлунка , товстого кишківника (фіброгастроскопія, колоноскопія)",
  },
  {
    title:
      "УЗД сечового міхура з визначенням залишкової сечі у дітей та дорослих",
    description: "Опис послуги 1",
  },
  {
    title:
      "УЗД щитовидної залози, молочних залоз , молочних залоз з імплантами, грудних залоз дітей , немовлят та підлітків , грудних залоз у чоловіків",
    description: "Опис послуги 1",
  },
  {
    title: "УЗД мʼяких тканин ( мʼязів, звʼязувального апарату) , суглобів",
    description: "Опис послуги 1",
  },
  {
    title: "УЗД лімфатичних вузлів дітей та дорослих",
    description: "Опис послуги 1",
  },
  {
    title:
      "УЗД спинних залоз , УЗД матки та придатків , УЗД матки та придатків підлітків, УЗД передміхурової залози ( абдомінально, ректально)",
    description: "Опис послуги 1",
  },
  {
    title:
      "2УЗД спинних залоз , УЗД матки та придатків , УЗД матки та придатків підлітків, УЗД передміхурової залози ( абдомінально, ректально)",
    description: "Опис послуги 2",
  },
];

const MENU = [
  {
    name: "Головна",
    link: "",
    id: "",
  },
  {
    name: "Послуги",
    link: "",
    id: "services",
  },
  {
    name: "Лікарі",
    link: "",
    id: "doctors",
  },
  {
    name: "Контакти",
    link: "",
    id: "contacts",
  },
];
export function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const serviceMap: {
    [key: string]: Array<{ title: string; description: string }>;
  } = useMemo(() => {
    let chunkSize = 1;
    let count = 0;
    const len = SERVICES.length;
    chunkSize = Math.floor(len / 3);

    return SERVICES.reduce((acc, curr, index) => {
      if (index > 0 && index % chunkSize === 0) {
        count += 1;
      }
      // @ts-ignore
      acc[count] = acc[count] ? [...acc[count], curr] : [curr];
      return acc;
    }, {});
  }, [SERVICES]);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    nav: { name: string; link: string; id: string | undefined }
  ) {
    setMenuOpen(false);
    if (!nav.link && nav.id) {
      e.preventDefault();
      const anchorLink = document.getElementById(nav.id);
      if (anchorLink) {
        const offsetPosition =
          anchorLink.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }

  return (
    <>
      <header>
        <StyledTopPanel>
          <StyledGrid>
            <StyledWrapCenter>
              <StyledFlexWrapper>
                <StyledHeaderWrapper>
                  <StyledWorkingTime>Пн - Сб, 8:00 - 19:00</StyledWorkingTime>
                  <StyledCall>
                    <div>+380 (93) 415 65 47</div>
                    <div className="divider"></div>
                    <div>+380 (66) 303 11 95</div>
                    <div className="divider"></div>
                    <div>+380 (93) 356 37 05</div>
                  </StyledCall>
                </StyledHeaderWrapper>
              </StyledFlexWrapper>
            </StyledWrapCenter>
          </StyledGrid>
        </StyledTopPanel>
        <StyledBottomPanel>
          <StyledGrid>
            <StyledWrapCenter>
              <StyledFlexWrapper>
                <StyledRelativeDiv>
                  <StyledLogo>
                    <img src={logo} alt="Logo" />
                  </StyledLogo>
                  <Burger onClick={() => setMenuOpen(!menuOpen)}>
                    <div />
                    <div />
                    <div />
                  </Burger>
                  <StyledNav open={menuOpen}>
                    <ul>
                      {MENU.map((nav) => {
                        return (
                          <li key={nav.name}>
                            <Link
                              to={nav.link || ""}
                              onClick={(e) => handleNavClick(e, nav)}
                            >
                              {nav.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </StyledNav>
                </StyledRelativeDiv>
              </StyledFlexWrapper>
            </StyledWrapCenter>
          </StyledGrid>
        </StyledBottomPanel>
      </header>
      <StyledMain>
        <section>
          <StyledMainBanner>
            <StyledGrid>
              <StyledWrapCenter>
                <StyledFlexWrapper>
                  <StyledBannerLeft>
                    <h2>Medicio medical group</h2>
                    <h4>Provide best quality healthcare for you</h4>
                    <StyledFacilities>
                      <ul>
                        <li>
                          <span className="fa fa-check fa-2x"></span>
                          <span>Affordable monthly premium packages</span>
                          <span>
                            Lorem ipsum dolor sit amet, in verterem persecuti
                            vix, sit te meis
                          </span>
                        </li>
                        <li>
                          <span className="fa fa-check fa-2x"></span>
                          <span>Affordable monthly premium packages</span>
                          <span>
                            Lorem ipsum dolor sit amet, in verterem persecuti
                            vix, sit te meis
                          </span>
                        </li>
                        <li>
                          <span className="fa fa-check fa-2x"></span>
                          <span>Affordable monthly premium packages</span>
                          <span>
                            Lorem ipsum dolor sit amet, in verterem persecuti
                            vix, sit te meis
                          </span>
                        </li>
                        <li>
                          <span className="fa fa-check fa-2x"></span>
                          <span>Affordable monthly premium packages</span>
                          <span>
                            Lorem ipsum dolor sit amet, in verterem persecuti
                            vix, sit te meis
                          </span>
                        </li>
                      </ul>
                    </StyledFacilities>
                  </StyledBannerLeft>
                  <StyledBannerRight></StyledBannerRight>
                </StyledFlexWrapper>
              </StyledWrapCenter>
            </StyledGrid>
          </StyledMainBanner>
        </section>
        <section>
          <StyledGrid>
            <StyledWrapCenter>
              <StyledFlexWrapper>
                <StyledFacilitiesContainer id="services">
                  <StyledH2>Послуги</StyledH2>
                  <StyledH3>
                    Ea melius ceteros oportere quo, pri habeo viderer facilisi
                    ei
                  </StyledH3>
                  <StyledServiceList>
                    {Object.keys(serviceMap).map((key, index) => {
                      return (
                        <ul key={key}>
                          {serviceMap[key].map(
                            (service: {
                              title: string;
                              description: string;
                            }) => {
                              return service.title ? (
                                <li key={service.title}>
                                  <span className="fa fa-check fa-2x"></span>
                                  <span>{service.title}</span>
                                  <span>{service.description || ""}</span>
                                </li>
                              ) : null;
                            }
                          )}
                        </ul>
                      );
                    })}
                  </StyledServiceList>
                </StyledFacilitiesContainer>
              </StyledFlexWrapper>
            </StyledWrapCenter>
          </StyledGrid>
        </section>
        <DoctorsSection doctors={DOCTORS} />
        {/* <section>
          <StyledGrid>
            <StyledWrapCenter>
              <StyledFlexWrapper>
                <StyledGoogleMap>
                  <StyledH2>Find Us</StyledH2>
                  <StyledH3>
                    Ea melius ceteros oportere quo, pri habeo viderer facilisi
                    ei
                  </StyledH3>
                  <APIProvider apiKey={""}>
                    <Map
                      style={{ width: "600px", height: "300px" }}
                      defaultCenter={{ lat: 22.54992, lng: 0 }}
                      defaultZoom={3}
                      gestureHandling={"greedy"}
                      disableDefaultUI={true}
                    />
                  </APIProvider>
                </StyledGoogleMap>
              </StyledFlexWrapper>
            </StyledWrapCenter>
          </StyledGrid>
        </section> */}
      </StyledMain>
      <footer>
        <StyledFooter>
          <StyledGrid>
            <StyledWrapCenter>
              <StyledFlexWrapper>
                <StyledFooterContent>
                  <StylefFooterCol>
                    <h3>ABOUT MEDICIO</h3>
                    <p>
                      Lorem ipsum dolor sit amet, ne nam purto nihil impetus, an
                      facilisi accommodare sea
                    </p>
                  </StylefFooterCol>
                  <StylefFooterCol>
                    <h3>ABOUT MEDICIO</h3>
                    <p>
                      Lorem ipsum dolor sit amet, ne nam purto nihil impetus, an
                      facilisi accommodare sea
                    </p>
                    <p>
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-calendar-o fa-stack-1x fa-inverse"></i>
                      </span>
                      Monday - Saturday, 8am to 10pm
                    </p>
                    <p>
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-envelope-o fa-stack-1x fa-inverse"></i>
                      </span>
                      hello@medicio.com
                    </p>
                    <StyledFooterContacts>
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x"></i>
                        <i className="fa fa-phone fa-stack-1x fa-inverse"></i>
                      </span>
                      <StyledFooterContactsWrapper>
                        <span>+380 (93) 415 65 47</span>
                        <span>+380 (66) 303 11 95</span>
                        <span>+380 (93) 356 37 05</span>
                      </StyledFooterContactsWrapper>
                    </StyledFooterContacts>
                  </StylefFooterCol>
                  <StylefFooterCol id="contacts">
                    <h3>CONTACTS</h3>
                    <p>
                      Lorem ipsum dolor sit amet, ne nam purto nihil impetus, an
                      facilisi accommodare sea
                    </p>
                    <h3>FOLLOW US</h3>
                    <div>
                      <ul className="company-social">
                        <li className="social-facebook">
                          <a href="#">
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li className="social-twitter">
                          <a href="#">
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li className="social-google">
                          <a href="#">
                            <i className="fa fa-google-plus"></i>
                          </a>
                        </li>
                        <li className="social-vimeo">
                          <a href="#">
                            <i className="fa fa-vimeo-square"></i>
                          </a>
                        </li>
                        <li className="social-dribble">
                          <a href="#">
                            <i className="fa fa-dribbble"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </StylefFooterCol>
                </StyledFooterContent>
              </StyledFlexWrapper>
            </StyledWrapCenter>
          </StyledGrid>
        </StyledFooter>
        <StyledSubFooter>
          <StyledGrid>
            <StyledWrapCenter>
              <StyledFlexWrapper>
                <StyledFlexContent>
                  <div>©Copyright 2015 - Medicio. All rights reserved.</div>
                  <div>Bootstrap Themes by BootstrapTaste</div>
                </StyledFlexContent>
              </StyledFlexWrapper>
            </StyledWrapCenter>
          </StyledGrid>
        </StyledSubFooter>
      </footer>
    </>
  );
}
