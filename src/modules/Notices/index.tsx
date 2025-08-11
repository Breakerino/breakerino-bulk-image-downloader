import { ToastPosition, useToast } from '@chakra-ui/react';
import React from 'react'
import { NoticeType } from './types';

export interface NoticesProps {
	loading: boolean;
	duration?: number;
	position?: ToastPosition;
	data: Partial<Record<NoticeType, Record<string, string>>>
}
 
const Notices: React.FC<NoticesProps> = ({ loading, data, duration = 5000, position = 'bottom' }) => {	
	const displayNotice = useToast({
		position,
		duration,
		variant: 'left-accent',
		isClosable: true,
	})

	React.useEffect(() => {
		if (loading ||  ! data ) return;
		
		for (const noticeGroup of Object.entries(data)) {
			const [type, notices]: any = noticeGroup;
			
			for (const notice of Object.entries(notices)) {
				const [id, message]: any = notice;
				
				displayNotice({
					id: `${type}-${id}`,
					description: message, 
					status: type,
					//onCloseComplete: () => {
					//	// TODO: Remove from notices	
					//}
				})
			}
		}
	}, [loading, data]);

	return null;
}

Notices.defaultProps = {};
Notices.displayName = 'Notices';

export default Notices;