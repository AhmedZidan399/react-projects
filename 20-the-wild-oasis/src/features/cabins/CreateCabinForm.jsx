import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

// hooks
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editedId, ...restValuesCabin } = cabinToEdit;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: editedId ? restValuesCabin : {},
  });

  // create cabin
  const { createCabin, isCreating } = useCreateCabin();

  // edit cabin
  const { editCabin, isEditing } = useEditCabin();

  const isPending = isCreating || isEditing;

  function submitFn(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    editedId
      ? editCabin(
          { newCabinData: { ...data, image }, id: editedId },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        )
      : createCabin(
          { newCabinData: { ...data, image } },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        );
  }

  return (
    <Form onSubmit={handleSubmit(submitFn)} type="modal">
      {/* name */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isPending}
          id="name"
          {...register("name", {
            required: "This Feild is required",
          })}
        />
      </FormRow>

      {/* max capacity */}
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isPending}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Feild is required",
            min: {
              value: 1,
              message: "Capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      {/* regular price */}
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isPending}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Feild is required",
            min: {
              value: 1,
              message: "Price must be at least 1",
            },
          })}
        />
      </FormRow>

      {/* discount */}
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isPending}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Feild is required",
            validate: (value) =>
              value <= +getValues().regularPrice
                ? true
                : "Discount should be less than regular price",
          })}
        />
      </FormRow>

      {/* description */}
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          disabled={isPending}
          id="description"
          {...register("description", {
            required: "This Feild is required",
          })}
        />
      </FormRow>

      {/* image */}
      <FormRow label="Image" error={errors?.image?.message}>
        <FileInput
          accept="image/*"
          disabled={isPending}
          id="image"
          {...register("image", {
            required: editedId ? false : "This Feild is required",
          })}
        />
      </FormRow>

      {/* buttons */}
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isPending}
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {editedId
            ? isPending
              ? "Editing..."
              : "Edit Cabin"
            : isPending
            ? "Adding..."
            : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
