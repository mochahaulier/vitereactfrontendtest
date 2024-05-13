import useTodo from "../hooks/useTodo";
import Input from "../components/Input";
import Todo from "../components/Todo";
import { TodoType } from "../api/config";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { InfinitySpin } from "react-loader-spinner";

export default function Home() {
  const {
    todos,
    isLoading,
    editedTodo,
    onChange,
    onSubmit,
    onEdit,
    onAbortEdit,
  } = useTodo();

  return (
    <>
      <MDBModal staticBackdrop open={isLoading}>
        <MDBModalDialog size="sm" centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Please wait...</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <InfinitySpin width="200" color="#3B71CA" />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBContainer className="py-5" style={{ maxWidth: "800px" }}>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard
              id="list1"
              style={{
                borderRadius: ".75rem",
                backgroundColor: "#eff1f255",
                backdropFilter: "blur(8px)",
              }}
            >
              <MDBCardBody className="py-4 px-4 px-md-5">
                <p className="h1 text-left mt-3 mb-4 pb-3 text-primary">
                  <MDBIcon far icon="check-square" className="me-1" />
                  <b className="maintitle"> SPRING TODO LIST</b>
                </p>
                <Input
                  key="input"
                  editedTodo={editedTodo}
                  onSubmit={onSubmit}
                  onChange={onChange}
                />
                <hr className="my-4" />
                {todos?.map((todo: TodoType) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    editedTodo={editedTodo}
                    onEdit={onEdit}
                    onAbortEdit={onAbortEdit}
                  />
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}
