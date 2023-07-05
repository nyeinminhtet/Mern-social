import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Message,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
  const distPatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="3.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,1.5rem,2rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ ":hover": { color: primaryLight, cursor: "pointer" } }}
        >
          SocialMedia
        </Typography>
        {isNonMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding=".1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
        {/*Desktop screen */}
        {isNonMobileScreen ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => distPatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px", color: dark }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard">
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: ".25rem",
                  p: ".25rem 1rem",
                  "& .MuiSvgIcon-root": { pr: ".25rem", w: "3rem" },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => distPatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            sx={{
              position: "absolute",
              right: 10,
            }}
            onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
          >
            <Menu />
          </IconButton>
        )}
        {/*Mobile Menu */}
        {!isNonMobileScreen && isMobileMenuToggle && (
          <Box
            position="fixed"
            right="3%"
            top="3%"
            height="60%"
            zIndex="10"
            maxWidth="500px"
            minWidth="200px"
            backgroundColor={background}
          >
            {/*Close button */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
              >
                <Close />
              </IconButton>
            </Box>

            {/*Menu Items */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1.5rem"
            >
              <IconButton
                onClick={() => distPatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ fontSize: "25px", color: dark }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard">
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: ".25rem",
                    p: ".25rem 1rem",
                    "& .MuiSvgIcon-root": { pr: ".25rem", w: "3rem" },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => distPatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
