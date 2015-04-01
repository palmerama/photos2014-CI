<?php

class Upload extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->helper(array('form', 'url'));
	}

	function index()
	{
		$this->load->view('admin', array('error' => '' ));
	}

	function do_upload()
	{
		print_r($_FILES);

		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size'] = '300000';
		$config['max_width']  = '10024';
		$config['max_height']  = '7068';

		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload("myfile"))
		{
			$error = array('error' => $this->upload->display_errors());
			$this->load->view('admin', $error);   // TODO echo error
		}
		else
		{
			die( var_dump($this->upload->data()) );
			$data = array('upload_data' => $this->upload->data());
			$this->load->view('admin', $data);  // TODO echo succes
		}
	}
}
?>