import { Button, ListItem } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { deleteShape } from "../redux/shapesSlice";

interface ItemProps {
  id: number;
  name: string;
}

const Item = ({ id, name }: ItemProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteShape(id));
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem",
      }}
    >
      <span>{name}</span>
      <Button
        color="error"
        variant="contained"
        sx={{ padding: "0.1rem 1rem" }}
        onClick={handleDelete}
      >
        Удалить
      </Button>
    </ListItem>
  );
};

export default Item;
