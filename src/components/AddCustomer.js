import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function AddCustomer(props) {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={props.toggleShow}
        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 cursor-pointer"
      >
        +Add Customer
      </button>

      <Modal
        show={props.show}
        onHide={props.toggleShow}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.addCustomer(name, industry);
              setName("");
              setIndustry("");
            }}
            id="form"
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="name"
                >
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  placeholder="Google"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="industry"
                >
                  Industry
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="industry"
                  type="text"
                  placeholder="Computing"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={props.toggleShow}
            className=" px-4 py-1 text-sm font-semibold rounded-full border border-purple-200 text-white bg-slate-600 hover:bg-slate-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 cursor-pointer"
          >
            Close
          </button>
          <button
            form="form"
            className=" px-4 py-1 text-sm  font-semibold rounded-full border border-purple-200 text-white bg-blue-600 hover:bg-blue-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 cursor-pointer"
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
