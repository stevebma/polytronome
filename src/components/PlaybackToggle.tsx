import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

type Props = {
	isPlaying: boolean;
	onClick?: () => void;
};

export class PlaybackToggle extends Component<Props> {
	render() {
		const { isPlaying, onClick } = this.props;
		return (
			<Button variant="primary" title="Toggle playback" onClick={onClick}>
				<FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
			</Button>
		);
	}
}
