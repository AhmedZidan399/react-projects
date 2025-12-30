import { useNavigate, useParams } from "react-router";
import { HiArrowDownOnSquare, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error } = useBooking();
  const { id: urlBookingId } = useParams();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { checkout, inCheckingout } = useCheckout();

  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  if (error)
    return <Empty message={`Booking with id#${urlBookingId} not found`} />;

  const { id, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <>
            <Button
              onClick={() => navigate(`/checkin/${id}`)}
              icon={<HiArrowDownOnSquare />}
            >
              Check In
            </Button>

            <Menus>
              <Modal.Open opens="delete-booking">
                <Button variation="danger" icon={<HiTrash />}>
                  Delete Permanently
                </Button>
              </Modal.Open>

              <Modal.Window name="delete-booking">
                <ConfirmDelete
                  resourceName="delete-booking"
                  onConfirm={() =>
                    deleteBooking(id, {
                      onSettled: () => moveBack(),
                    })
                  }
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Menus>
          </>
        )}

        {status === "checked-in" && (
          <Button
            onClick={() => checkout(id)}
            icon={<HiArrowDownOnSquare />}
            disabled={inCheckingout}
          >
            Check Out
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
