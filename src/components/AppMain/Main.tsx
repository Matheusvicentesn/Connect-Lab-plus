import PropTypes from "prop-types";
import { mainStyled } from "./main.styles";

export const Main = ({ children }) => {
  return <main style={mainStyled}>{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
