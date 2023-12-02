import { Box } from "@mui/material";
import { SERVER_URL } from "constants";

const UserImage = ({ image, size = "60px" }) => {
  console.log("IMGL:" + image)
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image} // TODO might be dependent on server port
      />
    </Box>
  );
};

export default UserImage;
