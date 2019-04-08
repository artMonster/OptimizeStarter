<?php

if ( trim($_POST['email']) && trim($_POST['name']) && trim($_POST['gr_ct']) ) {

    $fields = array(
        'name' => trim($_POST['name']),
        'phone' => trim($_POST['phone']),
        'email' => trim($_POST['email']),
        'gr_ct' => trim($_POST['gr_ct']),
    );


    require_once( 'GetResponseAPI3.class.php' );

    $getresponse = new GetResponse('32012af1128f3d015ed792c5be42b5e3');


    $arrContact = array(
        'query' => array(
            'email' => $fields['email'],
        ),
        'fields' => 'email, mobilephone'
    );

    $contact = $getresponse->getContacts($arrContact);
    $contact = json_decode(json_encode($contact), True);
    //$customfields = $getresponse->getCustomFields(array('name' => 'mobilephone'));
    //var_dump($customfields);

    if ($contact) {
        // FIND CONTACT

        $company = array();

        
        $customFieldValues = array(
            array('customFieldId' => 'aF5eh',
                'value' => array(
                    $fields['phone']
                )
            ),
        );
        

        $arr_new_contact = array(
            'name' => $fields['name'],
            'email' => $fields['email'],
            'dayOfCycle' => 0,
            'campaign' => array('campaignId' => $fields['gr_ct']),
            'customFieldValues' => $customFieldValues,
        );

        $responce = $getresponse->updateContact($value['contactId'], $arr_new_contact);//updateContact $value['contactId']
        $responce = json_decode(json_encode($responce), True);

    } else {
        // NO FIND CONTACT
        $customFieldValues = array(
            array('customFieldId' => 'aF5eh',
                'value' => array(
                    $fields['phone']
                )
            ),
        );
            $arr_new_contact = array(
            'name' => $fields['name'],
            'email' => $fields['email'],
            'dayOfCycle' => 0,
            'campaign' => array('campaignId' => $fields['gr_ct']),
            'customFieldValues' => $customFieldValues,
        );

        $responce = $getresponse->addContact($arr_new_contact);
        $responce = json_decode(json_encode($responce), True);

    }

    if ($responce && $responce['code'] && $responce['message']) {

        echo json_encode( array('code' => $responce['code'], 'message' => $responce['message'] ));

    } else {

        echo json_encode( array( 'gr_id' => 'ok' ) );
    }
}
?>