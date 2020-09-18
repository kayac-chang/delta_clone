import React from "react";
import styles from "./CheckIn.module.scss";
import Form from "./common/Form";
import TextField from "./common/TextField";
import Confirmation from "./Confirmation";

export default function CheckIn() {
  return (
    <div className={styles.checkin}>
      <Form>
        <Confirmation />

        <TextField name={"ex"} label={"ex. SFTORB"} />
        <TextField name={"from airport"} label={"From Airport"} />
      </Form>
    </div>
  );
}