import React, { useEffect, useState } from "react";
import Control from "./common/Control";
import Modal from "./common/Modal";
import Tabs from "./common/Tabs";
import TextField from "./common/TextField";
import styles from "./Search.module.scss";
import { GoSearch as SearchIcon } from "react-icons/go";
import { IoIosCloseCircleOutline as Clear } from "react-icons/io";
import { useAirportState } from "models/airport";
import { Airport } from "api/airport";

type ItemProps = {
  IATA: string;
  city: string;
};
function Item({ IATA, city }: ItemProps) {
  return (
    <div>
      <span>{IATA}</span>
      <span>{city}</span>
    </div>
  );
}

function useAirportSearch() {
  const airports = useAirportState();
  const cache = new Map<string, Airport[]>();

  function search(token: string) {
    if (cache.has(token)) {
      return cache.get(token) || [];
    }

    const targets = airports.filter(({ city }) =>
      city.toLowerCase().startsWith(token)
    );

    cache.set(token, targets);

    return targets;
  }

  return search;
}

type SearchFieldProps = {
  onChange?: (token: string) => void;
};
function SearchField({ onChange = () => {} }: SearchFieldProps) {
  const [token, setToken] = useState("");

  useEffect(() => onChange(token), [token]);

  return (
    <TextField
      className={styles.search}
      name={"origin"}
      label={"City or Airport"}
      icon={
        token.length ? (
          <Clear
            size={24}
            style={{ cursor: "pointer" }}
            onClick={() => setToken("")}
          />
        ) : (
          <SearchIcon size={24} />
        )
      }
      value={token}
      onChange={(e) => setToken(e.target.value)}
    />
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
};
export default function Search({ open, onClose }: Props) {
  const search = useAirportSearch();
  const [airport, setAirport] = useState([] as Airport[]);

  return (
    <Modal open={open} className={styles.page}>
      <div className={styles.fixed}>
        <Control onClose={onClose} />
      </div>

      <section>
        <div className={styles.tabs}>
          <Tabs
            options={{
              SEARCH: () => {},
            }}
          />
        </div>

        <div>
          <h5>Origin</h5>

          <SearchField
            onChange={(token) =>
              setAirport(token.length < 3 ? [] : search(token))
            }
          />
        </div>

        <div className={styles.list}>
          {airport.map(({ id, IATA, city }) => (
            <Item key={id} IATA={IATA} city={city} />
          ))}
        </div>
      </section>
    </Modal>
  );
}
