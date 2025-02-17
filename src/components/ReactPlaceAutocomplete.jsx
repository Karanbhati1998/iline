import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const ReactPlaceAutocomplete = ({ setUpdateState, address }) => {
  const handleChangeAddress = (newAddress) => {
    setUpdateState((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: newAddress,
      },
    }));
  };

  const handleSelectAddress = (newAddress) => {
    geocodeByAddress(newAddress)
      .then((results) => getLatLng(results[0])) 
      .then((latLng) => {
        console.log("Success", latLng); 

        setUpdateState((prev) => ({
          ...prev,
          location: {
            address: newAddress,
            lat: latLng.lat,
            long: latLng.lng,
          },
        }));
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      value={address || ""}
      onChange={handleChangeAddress}
      onSelect={handleSelectAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "form-control",
            })}
          />
          <div
            className="autocomplete-dropdown-container"
            style={{
              position: "absolute",
              zIndex: "9999",
            }}
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default ReactPlaceAutocomplete;
