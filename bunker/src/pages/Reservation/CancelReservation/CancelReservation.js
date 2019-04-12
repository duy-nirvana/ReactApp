import React from "react";
import {
	TransitionablePortal,
	Button,
	Message,
	Segment,
	Confirm
} from "semantic-ui-react";
import {withFirebase} from "../../../server/Firebase";
import CancelReservationForm from "./CancelReservationForm";

const CancelReservation = props => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);

	const {reservation, hotel} = props;
	const user = JSON.parse(localStorage.getItem("authUser"));

	const handleDeleteReservation = () => {
		this.props.firebase
			.deleteReservationFromDB(reservation.id, user.uid)
			.catch(error => {
				setIsError(true);
				console.log(error);
			});
		console.log("handle Delete");
	};

	React.useEffect(() => {
		setIsOpen(false);
	}, []);
	React.useEffect(
		() => {
			setIsOpen(props.open);
		},
		[props.open]
	);

	return (
		<div>
			<Button
				size="small"
				color="red"
				width="70px"
				onClick={props.handleOpen}
				positie={!isOpen}
				negative={isOpen}
			>
				Delete this Reservation
			</Button>
			<TransitionablePortal onClose={props.handleClose} open={isOpen}>
				<Segment
					size={"massive"}
					style={{left: "30%", position: "fixed", top: "0%", zIndex: 1000}}
				>
					<CancelReservationForm
						reservation={reservation}
						isError={isError}
						user={user}
						hotel={hotel}
					/>
					<Button
						content={"Delete This Reservation"}
						color="red"
						onClick={() => setIsConfirmOpen(true)}
					/>
					<Confirm
						content={
							"You will only recieve 80% of your payment, do you still want to cancel reservation"
						}
						confirmButton={"Yes, I am sure"}
						open={isConfirmOpen}
						onCancel={() => setIsConfirmOpen(false)}
						onConfirm={handleDeleteReservation}
					/>
					{isError ? (
						<Message negative>
							<Message.Header>Opps!!!</Message.Header>
							<p>Something when wrong</p>
						</Message>
					) : null}
				</Segment>
			</TransitionablePortal>
		</div>
	);
};

export default withFirebase(CancelReservation);