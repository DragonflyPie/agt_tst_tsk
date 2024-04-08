import { Box, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { LatLngTuple, addShape, selectLastId } from "../redux/shapesSlice";
import { useEffect } from "react";

interface FormData {
  name: string;
  lat: number;
  lng: number;
}

const Form = () => {
  const dispatch = useAppDispatch();
  const lastId = useAppSelector(selectLastId);
  console.log(lastId);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: "",
      lat: 0,
      lng: 0,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    try {
      const newShape = {
        type: "Feature",
        properties: { id: lastId + 1, name: data.name },
        geometry: {
          coordinates: [data.lat, data.lng] as LatLngTuple,
          type: "Point" as const,
        },
      };
      dispatch(addShape(newShape));
    } catch (error) {
      // В данном случае Thunk всегда вернёт успешный промис, но в теории здесь могла быть обработка ошибок
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Box
      component="form"
      sx={{
        position: "absolute",
        left: "1rem",
        bottom: "1rem",
        zIndex: "800",
        backgroundColor: "white",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        borderRadius: "5px",
        width: "20rem",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Имя"
            color="primary"
            size="small"
            FormHelperTextProps={{
              style: { position: "absolute", bottom: "-1.25rem" },
            }}
            focused
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />
        )}
      />
      <Controller
        name="lat"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^[-+]?[0-9]*\.?[0-9]+$/,
            message: "Только численные значения",
          },
          max: {
            value: 90,
            message: "Некорректное значение широты",
          },
          min: {
            value: -90,
            message: "Некорректное значение широты",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Широта"
            color="primary"
            size="small"
            FormHelperTextProps={{
              style: { position: "absolute", bottom: "-1.25rem" },
            }}
            focused
            error={!!errors.lat}
            helperText={errors.lat && errors.lat.message}
          />
        )}
      />
      <Controller
        name="lng"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^[-+]?[0-9]*\.?[0-9]+$/,
            message: "Только численные значения",
          },
          max: {
            value: 180,
            message: "Некорректное значение долготы",
          },
          min: {
            value: -180,
            message: "Некорректное значение долготы",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Долгота"
            color="primary"
            size="small"
            FormHelperTextProps={{
              style: { position: "absolute", bottom: "-1.25rem" },
            }}
            focused
            error={!!errors.lng}
            helperText={errors.lng && errors.lng.message}
          />
        )}
      />
      <Button variant="contained" type="submit">
        Сохранить
      </Button>
    </Box>
  );
};

export default Form;
