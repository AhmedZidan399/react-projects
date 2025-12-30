import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import styled from "styled-components";

const StyledAddCabin = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
  justify-items: flex-end;
  justify-content: flex-end;
  width: 100%;
`;

function AddCabin() {
  {
    /* 
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      
      <Button onClick={() => setIsOpenModal((val) => !val)}>Add New Cabin</Button>

      {isOpenModal && (
        <Modal onCloseModal={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
  */
  }

  return (
    <StyledAddCabin>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </StyledAddCabin>
  );
}

export default AddCabin;
