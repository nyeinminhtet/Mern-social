import { Box } from "@mui/material";
import { config } from "../config/config";

const UserImage = ({ image, size = "50px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        src={`${config.api}/assets/${image}`}
        alt="user"
      />
    </Box>
  );
};

export default UserImage;
