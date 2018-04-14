import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class TermsAndConditions extends Component {
	render() {
		return (
			<View>
				<ScrollView>
					<Text style={ styles.heading }>Welcome to pwet</Text>
						<Text style={ styles.paragraph }>These terms and conditions outline the rules and regulations for the use of pwet's app.</Text>
						<Text style={ styles.paragraph }>By accessing this website we assume you accept these terms and conditions in full. Do not continue to use pwet's app 
						if you do not accept all of the terms and conditions stated on this page.</Text>
						<Text style={ styles.paragraph }>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
						and any or all Agreements: “Client”, “You” and “Your” refers to you, the person accessing this website
						and accepting the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers
						to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves, or either the Client
						or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake
						the process of our assistance to the Client in the most appropriate manner, whether by formal meetings
						of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect
						of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law
						of . Any use of the above terminology or other words in the singular, plural,
						capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.</Text>
					<Text style={ styles.heading }>Cookies</Text>
						<Text style={ styles.paragraph }>We employ the use of cookies. By using pwet's app you consent to the use of cookies 
						in accordance with pwet’s privacy policy.</Text><Text style={ styles.paragraph }>Most of the modern day interactive web sites
						use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site
						to enable the functionality of this area and ease of use for those people visiting. Some of our 
						affiliate / advertising partners may also use cookies.</Text>
					<Text style={ styles.heading }>License</Text>
						<Text style={ styles.paragraph }>Unless otherwise stated, pwet and/or it’s licensors own the intellectual property rights for
						all material on pwet. All intellectual property rights are reserved. You may view and/or print
						pages from http://pwet.com for your own personal use subject to restrictions set in these terms and conditions.</Text>
						<Text style={ styles.paragraph }>You must not:</Text>
						
							<Text style={ styles.paragraph }>Republish material from pwet app</Text>
							<Text style={ styles.paragraph }>Sell, rent or sub-license material from pwet app</Text>
							<Text style={ styles.paragraph }>Reproduce, duplicate or copy material from pwet app</Text>
						
						<Text style={ styles.paragraph }>Redistribute content from pwet (unless content is specifically made for redistribution).</Text>
					<Text style={ styles.heading }>User Comments</Text>
						
							<Text style={ styles.paragraph }>This Agreement shall begin on the date hereof.</Text>
							<Text style={ styles.paragraph }>Certain parts of this website offer the opportunity for users to post and exchange opinions, information,
							material and data ('Comments') in areas of the website. pwet does not screen, edit, publish
							or review Comments prior to their appearance on the website and Comments do not reflect the views or
							opinions of pwet, its agents or affiliates. Comments reflect the view and opinion of the
							person who posts such view or opinion. To the extent permitted by applicable laws pwet shall
							not be responsible or liable for the Comments or for any loss cost, liability, damages or expenses caused
							and or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this
							app.</Text>
							<Text style={ styles.paragraph }>pwet reserves the right to monitor all Comments and to remove any Comments which it considers
							in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions.</Text>
							<Text style={ styles.paragraph }>You warrant and represent that:
								
									<Text style={ styles.paragraph }>You are entitled to post the Comments on our website and have all necessary licenses and consents to
											do so;</Text>
									<Text style={ styles.paragraph }>The Comments do not infringe any intellectual property right, including without limitation copyright,
										patent or trademark, or other proprietary right of any third party;</Text>
									<Text style={ styles.paragraph }>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material
										or material which is an invasion of privacy</Text>
									<Text style={ styles.paragraph }>The Comments will not be used to solicit or promote business or custom or present commercial activities
										or unlawful activity.</Text>
									
								</Text>
							<Text style={ styles.paragraph }>You hereby grant to pwet a non-exclusive royalty-free license to use, reproduce,
							edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats
							or media.</Text>
						
					<Text style={ styles.heading }>Reservation of Rights</Text>
						<Text style={ styles.paragraph }>We reserve the right at any time and in its sole discretion to request that you remove all links or any particular
						link to our app. You agree to immediately remove all links to our app upon such request. We also
						reserve the right to amend these terms and conditions and its linking policy at any time. By continuing
						to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.</Text>
					<Text style={ styles.heading }>Removal of links from our app</Text>
						<Text style={ styles.paragraph }>If you find any link on our app or any linked web site objectionable for any reason, you may contact
						us about this. We will consider requests to remove links but will have no obligation to do so or to respond
						directly to you.</Text>
						<Text style={ styles.paragraph }>Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness
						or accuracy; nor do we commit to ensuring that the website remains available or that the material on the
						website is kept up to date.</Text>
					<Text style={ styles.heading }>Content Liability</Text>
						<Text style={ styles.paragraph }>We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify
						and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any
						page on your Web site or within any context containing content or materials that may be interpreted as
						libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or
						other violation of, any third party rights.</Text>
					<Text style={ styles.heading }>Disclaimer</Text>
						<Text style={ styles.paragraph }>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer will:</Text>
						
						<Text style={ styles.paragraph }>limit or exclude our or your liability for death or personal injury resulting from negligence;</Text>
						<Text style={ styles.paragraph }>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</Text>
						<Text style={ styles.paragraph }>limit any of our or your liabilities in any way that is not permitted under applicable law; or</Text>
						<Text style={ styles.paragraph }>exclude any of our or your liabilities that may not be excluded under applicable law.</Text>
						
						<Text style={ styles.paragraph }>The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a)
						are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or
						in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort
						(including negligence) and for breach of statutory duty.</Text>
						<Text style={ styles.paragraph }>To the extent that the website and the information and services on the website are provided free of charge,
						we will not be liable for any loss or damage of any nature.</Text>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	heading: {
		fontWeight: 'bold',
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,
	},
	paragraph: {
		lineHeight: 20,
		paddingLeft: 5,
		paddingRight: 5,
	},
});

export default connect( state => {
	return {};
}, {})( TermsAndConditions );