import { useState, useEffect } from "react";
import { useTheme, Box, Typography, Divider } from "@mui/material";
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  EditOffOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../config/config";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`${config.api}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impression,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* first row */}
      <FlexBetween
        gap=".5rem"
        pb="1.5rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap=".5rem">
          <UserImage image={picturePath} size="45px" />
          <Box>
            <Typography
              variant="h5"
              color={dark}
              fontWeight="500"
              sx={{
                ":hover": { color: palette.primary.light, cursor: "pointer" },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* second row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb=".5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location} </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation} </Typography>
        </Box>
      </Box>

      {/* Third row */}
      <Box p="1rem 0">
        <FlexBetween mb=".5rem">
          <Typography color={medium}>Followers</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}{" "}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impression of your posts</Typography>
          <Typography color={main} fontWeight="500">
            {impression}{" "}
          </Typography>
        </FlexBetween>
      </Box>

      {/* fourth row */}
      <Box p="1rem 0">
        <Typography fontWeight="500" fontSize="1rem" color={main} mb="1rem">
          Other Social Platforms{" "}
        </Typography>

        <FlexBetween gap="1rem" mb=".5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="social" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
            </Box>
          </FlexBetween>
          <EditOffOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="social" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
            </Box>
          </FlexBetween>
          <EditOffOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
