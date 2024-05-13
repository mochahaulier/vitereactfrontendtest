import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { TodoType } from "../api/config";

type InputProps = {
  editedTodo: TodoType;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ editedTodo, onSubmit, onChange }: InputProps) {
  const { id: idEdit, todoText, isImportant } = editedTodo;
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="pb-2">
        <MDBCard
          style={{
            backgroundColor: "#eff1f255",
            backdropFilter: "blur(8px)",
          }}
        >
          <MDBCardBody>
            <div className="d-flex flex-row align-items-center">
              <input
                required
                pattern="\S(.*\S)?"
                title="This field is required"
                style={{
                  backgroundColor: "transparent",
                }}
                type="text"
                className="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="What needs to be done?"
                name="todoText"
                value={todoText}
                onChange={(e) => onChange(e)}
              />
              <MDBTooltip
                tag="a"
                wrapperProps={{ href: "#!" }}
                title="Set as important."
              >
                <MDBCheckbox
                  className="mx-4"
                  label=""
                  name="isImportant"
                  checked={isImportant}
                  id="isImportantChecked"
                  onChange={(e) => onChange(e)}
                />
              </MDBTooltip>
              <div>
                <MDBBtn type="submit">
                  {idEdit ? (
                    <MDBIcon fas icon="rotate" />
                  ) : (
                    <MDBIcon fas icon="floppy-disk" />
                  )}
                </MDBBtn>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </form>
  );
}

export default Input;
