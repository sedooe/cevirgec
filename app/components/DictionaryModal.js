import React, { Component, PropTypes } from 'react'
import { Button, Checkbox, Form, Icon, Modal } from 'semantic-ui-react'
import tr from '../utils/Translation';

const languages = [
    {value: "af", text: <span><i className="af flag"></i>Afghanistan</span>},
    {value: "ax", text: <span><i className="ax flag"></i>Aland Islands</span>},
    {value: "al", text: <span><i className="al flag"></i>Albania</span>},
    {value: "dz", text: <span><i className="dz flag"></i>Algeria</span>},
    {value: "as", text: <span><i className="as flag"></i>American Samoa</span>},
    {value: "ad", text: <span><i className="ad flag"></i>Andorra</span>},
    {value: "ao", text: <span><i className="ao flag"></i>Angola</span>},
    {value: "ai", text: <span><i className="ai flag"></i>Anguilla</span>},
    {value: "ag", text: <span><i className="ag flag"></i>Antigua</span>},
    {value: "ar", text: <span><i className="ar flag"></i>Argentina</span>},
    {value: "am", text: <span><i className="am flag"></i>Armenia</span>},
    {value: "aw", text: <span><i className="aw flag"></i>Aruba</span>},
    {value: "au", text: <span><i className="au flag"></i>Australia</span>},
    {value: "at", text: <span><i className="at flag"></i>Austria</span>},
    {value: "az", text: <span><i className="az flag"></i>Azerbaijan</span>},
    {value: "bs", text: <span><i className="bs flag"></i>Bahamas</span>},
    {value: "bh", text: <span><i className="bh flag"></i>Bahrain</span>},
    {value: "bd", text: <span><i className="bd flag"></i>Bangladesh</span>},
    {value: "bb", text: <span><i className="bb flag"></i>Barbados</span>},
    {value: "by", text: <span><i className="by flag"></i>Belarus</span>},
    {value: "be", text: <span><i className="be flag"></i>Belgium</span>},
    {value: "bz", text: <span><i className="bz flag"></i>Belize</span>},
    {value: "bj", text: <span><i className="bj flag"></i>Benin</span>},
    {value: "bm", text: <span><i className="bm flag"></i>Bermuda</span>},
    {value: "bt", text: <span><i className="bt flag"></i>Bhutan</span>},
    {value: "bo", text: <span><i className="bo flag"></i>Bolivia</span>},
    {value: "ba", text: <span><i className="ba flag"></i>Bosnia</span>},
    {value: "bw", text: <span><i className="bw flag"></i>Botswana</span>},
    {value: "bv", text: <span><i className="bv flag"></i>Bouvet Island</span>},
    {value: "br", text: <span><i className="br flag"></i>Brazil</span>},
    {value: "vg", text: <span><i className="vg flag"></i>British Virgin Islands</span>},
    {value: "bn", text: <span><i className="bn flag"></i>Brunei</span>},
    {value: "bg", text: <span><i className="bg flag"></i>Bulgaria</span>},
    {value: "bf", text: <span><i className="bf flag"></i>Burkina Faso</span>},
    {value: "bi", text: <span><i className="bi flag"></i>Burundi</span>},
    {value: "tc", text: <span><i className="tc flag"></i>Caicos Islands</span>},
    {value: "kh", text: <span><i className="kh flag"></i>Cambodia</span>},
    {value: "cm", text: <span><i className="cm flag"></i>Cameroon</span>},
    {value: "ca", text: <span><i className="ca flag"></i>Canada</span>},
    {value: "cv", text: <span><i className="cv flag"></i>Cape Verde</span>},
    {value: "ky", text: <span><i className="ky flag"></i>Cayman Islands</span>},
    {value: "cf", text: <span><i className="cf flag"></i>Central African Republic</span>},
    {value: "td", text: <span><i className="td flag"></i>Chad</span>},
    {value: "cl", text: <span><i className="cl flag"></i>Chile</span>},
    {value: "cn", text: <span><i className="cn flag"></i>China</span>},
    {value: "cx", text: <span><i className="cx flag"></i>Christmas Island</span>},
    {value: "cc", text: <span><i className="cc flag"></i>Cocos Islands</span>},
    {value: "co", text: <span><i className="co flag"></i>Colombia</span>},
    {value: "km", text: <span><i className="km flag"></i>Comoros</span>},
    {value: "cg", text: <span><i className="cg flag"></i>Congo Brazzaville</span>},
    {value: "cd", text: <span><i className="cd flag"></i>Congo</span>},
    {value: "ck", text: <span><i className="ck flag"></i>Cook Islands</span>},
    {value: "cr", text: <span><i className="cr flag"></i>Costa Rica</span>},
    {value: "ci", text: <span><i className="ci flag"></i>Cote Divoire</span>},
    {value: "hr", text: <span><i className="hr flag"></i>Croatia</span>},
    {value: "cu", text: <span><i className="cu flag"></i>Cuba</span>},
    {value: "cy", text: <span><i className="cy flag"></i>Cyprus</span>},
    {value: "cz", text: <span><i className="cz flag"></i>Czech Republic</span>},
    {value: "dk", text: <span><i className="dk flag"></i>Denmark</span>},
    {value: "dj", text: <span><i className="dj flag"></i>Djibouti</span>},
    {value: "dm", text: <span><i className="dm flag"></i>Dominica</span>},
    {value: "do", text: <span><i className="do flag"></i>Dominican Republic</span>},
    {value: "ec", text: <span><i className="ec flag"></i>Ecuador</span>},
    {value: "eg", text: <span><i className="eg flag"></i>Egypt</span>},
    {value: "sv", text: <span><i className="sv flag"></i>El Salvador</span>},
    {value: "gb", text: <span><i className="gb flag"></i>England</span>},
    {value: "gq", text: <span><i className="gq flag"></i>Equatorial Guinea</span>},
    {value: "er", text: <span><i className="er flag"></i>Eritrea</span>},
    {value: "ee", text: <span><i className="ee flag"></i>Estonia</span>},
    {value: "et", text: <span><i className="et flag"></i>Ethiopia</span>},
    {value: "eu", text: <span><i className="eu flag"></i>European Union</span>},
    {value: "fk", text: <span><i className="fk flag"></i>Falkland Islands</span>},
    {value: "fo", text: <span><i className="fo flag"></i>Faroe Islands</span>},
    {value: "fj", text: <span><i className="fj flag"></i>Fiji</span>},
    {value: "fi", text: <span><i className="fi flag"></i>Finland</span>},
    {value: "fr", text: <span><i className="fr flag"></i>France</span>},
    {value: "gf", text: <span><i className="gf flag"></i>French Guiana</span>},
    {value: "pf", text: <span><i className="pf flag"></i>French Polynesia</span>},
    {value: "tf", text: <span><i className="tf flag"></i>French Territories</span>},
    {value: "ga", text: <span><i className="ga flag"></i>Gabon</span>},
    {value: "gm", text: <span><i className="gm flag"></i>Gambia</span>},
    {value: "ge", text: <span><i className="ge flag"></i>Georgia</span>},
    {value: "de", text: <span><i className="de flag"></i>Germany</span>},
    {value: "gh", text: <span><i className="gh flag"></i>Ghana</span>},
    {value: "gi", text: <span><i className="gi flag"></i>Gibraltar</span>},
    {value: "gr", text: <span><i className="gr flag"></i>Greece</span>},
    {value: "gl", text: <span><i className="gl flag"></i>Greenland</span>},
    {value: "gd", text: <span><i className="gd flag"></i>Grenada</span>},
    {value: "gp", text: <span><i className="gp flag"></i>Guadeloupe</span>},
    {value: "gu", text: <span><i className="gu flag"></i>Guam</span>},
    {value: "gt", text: <span><i className="gt flag"></i>Guatemala</span>},
    {value: "gw", text: <span><i className="gw flag"></i>Guinea-Bissau</span>},
    {value: "gn", text: <span><i className="gn flag"></i>Guinea</span>},
    {value: "gy", text: <span><i className="gy flag"></i>Guyana</span>},
    {value: "ht", text: <span><i className="ht flag"></i>Haiti</span>},
    {value: "hm", text: <span><i className="hm flag"></i>Heard Island</span>},
    {value: "hn", text: <span><i className="hn flag"></i>Honduras</span>},
    {value: "hk", text: <span><i className="hk flag"></i>Hong Kong</span>},
    {value: "hu", text: <span><i className="hu flag"></i>Hungary</span>},
    {value: "is", text: <span><i className="is flag"></i>Iceland</span>},
    {value: "in", text: <span><i className="in flag"></i>India</span>},
    {value: "io", text: <span><i className="io flag"></i>Indian Ocean Territory</span>},
    {value: "id", text: <span><i className="id flag"></i>Indonesia</span>},
    {value: "ir", text: <span><i className="ir flag"></i>Iran</span>},
    {value: "iq", text: <span><i className="iq flag"></i>Iraq</span>},
    {value: "ie", text: <span><i className="ie flag"></i>Ireland</span>},
    {value: "il", text: <span><i className="il flag"></i>Israel</span>},
    {value: "it", text: <span><i className="it flag"></i>Italy</span>},
    {value: "jm", text: <span><i className="jm flag"></i>Jamaica</span>},
    {value: "jp", text: <span><i className="jp flag"></i>Japan</span>},
    {value: "jo", text: <span><i className="jo flag"></i>Jordan</span>},
    {value: "kz", text: <span><i className="kz flag"></i>Kazakhstan</span>},
    {value: "ke", text: <span><i className="ke flag"></i>Kenya</span>},
    {value: "ki", text: <span><i className="ki flag"></i>Kiribati</span>},
    {value: "kw", text: <span><i className="kw flag"></i>Kuwait</span>},
    {value: "kg", text: <span><i className="kg flag"></i>Kyrgyzstan</span>},
    {value: "la", text: <span><i className="la flag"></i>Laos</span>},
    {value: "lv", text: <span><i className="lv flag"></i>Latvia</span>},
    {value: "lb", text: <span><i className="lb flag"></i>Lebanon</span>},
    {value: "ls", text: <span><i className="ls flag"></i>Lesotho</span>},
    {value: "lr", text: <span><i className="lr flag"></i>Liberia</span>},
    {value: "ly", text: <span><i className="ly flag"></i>Libya</span>},
    {value: "li", text: <span><i className="li flag"></i>Liechtenstein</span>},
    {value: "lt", text: <span><i className="lt flag"></i>Lithuania</span>},
    {value: "lu", text: <span><i className="lu flag"></i>Luxembourg</span>},
    {value: "mo", text: <span><i className="mo flag"></i>Macau</span>},
    {value: "mk", text: <span><i className="mk flag"></i>Macedonia</span>},
    {value: "mg", text: <span><i className="mg flag"></i>Madagascar</span>},
    {value: "mw", text: <span><i className="mw flag"></i>Malawi</span>},
    {value: "my", text: <span><i className="my flag"></i>Malaysia</span>},
    {value: "mv", text: <span><i className="mv flag"></i>Maldives</span>},
    {value: "ml", text: <span><i className="ml flag"></i>Mali</span>},
    {value: "mt", text: <span><i className="mt flag"></i>Malta</span>},
    {value: "mh", text: <span><i className="mh flag"></i>Marshall Islands</span>},
    {value: "mq", text: <span><i className="mq flag"></i>Martinique</span>},
    {value: "mr", text: <span><i className="mr flag"></i>Mauritania</span>},
    {value: "mu", text: <span><i className="mu flag"></i>Mauritius</span>},
    {value: "yt", text: <span><i className="yt flag"></i>Mayotte</span>},
    {value: "mx", text: <span><i className="mx flag"></i>Mexico</span>},
    {value: "fm", text: <span><i className="fm flag"></i>Micronesia</span>},
    {value: "md", text: <span><i className="md flag"></i>Moldova</span>},
    {value: "mc", text: <span><i className="mc flag"></i>Monaco</span>},
    {value: "mn", text: <span><i className="mn flag"></i>Mongolia</span>},
    {value: "me", text: <span><i className="me flag"></i>Montenegro</span>},
    {value: "ms", text: <span><i className="ms flag"></i>Montserrat</span>},
    {value: "ma", text: <span><i className="ma flag"></i>Morocco</span>},
    {value: "mz", text: <span><i className="mz flag"></i>Mozambique</span>},
    {value: "na", text: <span><i className="na flag"></i>Namibia</span>},
    {value: "nr", text: <span><i className="nr flag"></i>Nauru</span>},
    {value: "np", text: <span><i className="np flag"></i>Nepal</span>},
    {value: "an", text: <span><i className="an flag"></i>Netherlands Antilles</span>},
    {value: "nl", text: <span><i className="nl flag"></i>Netherlands</span>},
    {value: "nc", text: <span><i className="nc flag"></i>New Caledonia</span>},
    {value: "pg", text: <span><i className="pg flag"></i>New Guinea</span>},
    {value: "nz", text: <span><i className="nz flag"></i>New Zealand</span>},
    {value: "ni", text: <span><i className="ni flag"></i>Nicaragua</span>},
    {value: "ne", text: <span><i className="ne flag"></i>Niger</span>},
    {value: "ng", text: <span><i className="ng flag"></i>Nigeria</span>},
    {value: "nu", text: <span><i className="nu flag"></i>Niue</span>},
    {value: "nf", text: <span><i className="nf flag"></i>Norfolk Island</span>},
    {value: "kp", text: <span><i className="kp flag"></i>North Korea</span>},
    {value: "mp", text: <span><i className="mp flag"></i>Northern Mariana Islands</span>},
    {value: "no", text: <span><i className="no flag"></i>Norway</span>},
    {value: "om", text: <span><i className="om flag"></i>Oman</span>},
    {value: "pk", text: <span><i className="pk flag"></i>Pakistan</span>},
    {value: "pw", text: <span><i className="pw flag"></i>Palau</span>},
    {value: "ps", text: <span><i className="ps flag"></i>Palestine</span>},
    {value: "pa", text: <span><i className="pa flag"></i>Panama</span>},
    {value: "py", text: <span><i className="py flag"></i>Paraguay</span>},
    {value: "pe", text: <span><i className="pe flag"></i>Peru</span>},
    {value: "ph", text: <span><i className="ph flag"></i>Philippines</span>},
    {value: "pn", text: <span><i className="pn flag"></i>Pitcairn Islands</span>},
    {value: "pl", text: <span><i className="pl flag"></i>Poland</span>},
    {value: "pt", text: <span><i className="pt flag"></i>Portugal</span>},
    {value: "pr", text: <span><i className="pr flag"></i>Puerto Rico</span>},
    {value: "qa", text: <span><i className="qa flag"></i>Qatar</span>},
    {value: "re", text: <span><i className="re flag"></i>Reunion</span>},
    {value: "ro", text: <span><i className="ro flag"></i>Romania</span>},
    {value: "ru", text: <span><i className="ru flag"></i>Russia</span>},
    {value: "rw", text: <span><i className="rw flag"></i>Rwanda</span>},
    {value: "sh", text: <span><i className="sh flag"></i>Saint Helena</span>},
    {value: "kn", text: <span><i className="kn flag"></i>Saint Kitts and Nevis</span>},
    {value: "lc", text: <span><i className="lc flag"></i>Saint Lucia</span>},
    {value: "pm", text: <span><i className="pm flag"></i>Saint Pierre</span>},
    {value: "vc", text: <span><i className="vc flag"></i>Saint Vincent</span>},
    {value: "ws", text: <span><i className="ws flag"></i>Samoa</span>},
    {value: "sm", text: <span><i className="sm flag"></i>San Marino</span>},
    {value: "gs", text: <span><i className="gs flag"></i>Sandwich Islands</span>},
    {value: "st", text: <span><i className="st flag"></i>Sao Tome</span>},
    {value: "sa", text: <span><i className="sa flag"></i>Saudi Arabia</span>},
    {value: "sn", text: <span><i className="sn flag"></i>Senegal</span>},
    {value: "cs", text: <span><i className="cs flag"></i>Serbia</span>},
    {value: "rs", text: <span><i className="rs flag"></i>Serbia</span>},
    {value: "sc", text: <span><i className="sc flag"></i>Seychelles</span>},
    {value: "sl", text: <span><i className="sl flag"></i>Sierra Leone</span>},
    {value: "sg", text: <span><i className="sg flag"></i>Singapore</span>},
    {value: "sk", text: <span><i className="sk flag"></i>Slovakia</span>},
    {value: "si", text: <span><i className="si flag"></i>Slovenia</span>},
    {value: "sb", text: <span><i className="sb flag"></i>Solomon Islands</span>},
    {value: "so", text: <span><i className="so flag"></i>Somalia</span>},
    {value: "za", text: <span><i className="za flag"></i>South Africa</span>},
    {value: "kr", text: <span><i className="kr flag"></i>South Korea</span>},
    {value: "es", text: <span><i className="es flag"></i>Spain</span>},
    {value: "lk", text: <span><i className="lk flag"></i>Sri Lanka</span>},
    {value: "sd", text: <span><i className="sd flag"></i>Sudan</span>},
    {value: "sr", text: <span><i className="sr flag"></i>Suriname</span>},
    {value: "sj", text: <span><i className="sj flag"></i>Svalbard</span>},
    {value: "sz", text: <span><i className="sz flag"></i>Swaziland</span>},
    {value: "se", text: <span><i className="se flag"></i>Sweden</span>},
    {value: "ch", text: <span><i className="ch flag"></i>Switzerland</span>},
    {value: "sy", text: <span><i className="sy flag"></i>Syria</span>},
    {value: "tw", text: <span><i className="tw flag"></i>Taiwan</span>},
    {value: "tj", text: <span><i className="tj flag"></i>Tajikistan</span>},
    {value: "tz", text: <span><i className="tz flag"></i>Tanzania</span>},
    {value: "th", text: <span><i className="th flag"></i>Thailand</span>},
    {value: "tl", text: <span><i className="tl flag"></i>Timorleste</span>},
    {value: "tg", text: <span><i className="tg flag"></i>Togo</span>},
    {value: "tk", text: <span><i className="tk flag"></i>Tokelau</span>},
    {value: "to", text: <span><i className="to flag"></i>Tonga</span>},
    {value: "tt", text: <span><i className="tt flag"></i>Trinidad</span>},
    {value: "tn", text: <span><i className="tn flag"></i>Tunisia</span>},
    {value: "tr", text: <span><i className="tr flag"></i>Turkey</span>},
    {value: "tm", text: <span><i className="tm flag"></i>Turkmenistan</span>},
    {value: "tv", text: <span><i className="tv flag"></i>Tuvalu</span>},
    {value: "ug", text: <span><i className="ug flag"></i>Uganda</span>},
    {value: "ua", text: <span><i className="ua flag"></i>Ukraine</span>},
    {value: "ae", text: <span><i className="ae flag"></i>United Arab Emirates</span>},
    {value: "us", text: <span><i className="us flag"></i>United States</span>},
    {value: "uy", text: <span><i className="uy flag"></i>Uruguay</span>},
    {value: "um", text: <span><i className="um flag"></i>Us Minor Islands</span>},
    {value: "vi", text: <span><i className="vi flag"></i>Us Virgin Islands</span>},
    {value: "uz", text: <span><i className="uz flag"></i>Uzbekistan</span>},
    {value: "vu", text: <span><i className="vu flag"></i>Vanuatu</span>},
    {value: "va", text: <span><i className="va flag"></i>Vatican City</span>},
    {value: "ve", text: <span><i className="ve flag"></i>Venezuela</span>},
    {value: "vn", text: <span><i className="vn flag"></i>Vietnam</span>},
    {value: "wf", text: <span><i className="wf flag"></i>Wallis and Futuna</span>},
    {value: "eh", text: <span><i className="eh flag"></i>Western Sahara</span>},
    {value: "ye", text: <span><i className="ye flag"></i>Yemen</span>},
    {value: "zm", text: <span><i className="zm flag"></i>Zambia</span>},
    {value: "zw", text: <span><i className="zw flag"></i>Zimbabwe</span>}];

const contexts = [
  { text: 'No Context', value: null },
  { text: 'Politics', value: 'politics' },
  { text: 'Technology', value: 'technology' },
  { text: 'Science', value: 'science' },
  { text: 'Business', value: 'business' },
  { text: 'Economics', value: 'economics' },
  { text: 'Sport', value: 'sport' },
];

const DictionaryModal = ({open, dictionary, onHide}) => (
  <Modal open={open}>
    <Modal.Header>
      {dictionary.id ? tr('Edit Dictionary') : tr('New Dictionary')}
    </Modal.Header>
    <Modal.Content>
      <Form>
        <input type="hidden" name="id" value={dictionary.id} />
        <Form.Field>
          <label>Name</label>
          <input placeholder="Name" defaultValue={dictionary.name} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input placeholder="Description" defaultValue={dictionary.description} />
        </Form.Field>
        <Form.Field>
          <label>Context</label>
          <Form.Dropdown selection
            options={contexts}
            placeholder="Choose a context"
            defaultValue={dictionary.context}
           />
        </Form.Field>
        <div className="two fields">
          <Form.Field>
            <label>{tr('Source Language')}</label>
            <Form.Dropdown selection
              options={contexts}
              placeholder="Choose a language"
              defaultValue={dictionary.sourceLanguage}
            />
          </Form.Field>
          <Form.Field>
            <label>{tr('Target Language')}</label>
            <Form.Dropdown selection
              options={contexts}
              placeholder="Choose a language"
              defaultValue={dictionary.targetLanguage}
            />
          </Form.Field>
        </div>
        <Form.Field>
          <label>In use</label>
          <Checkbox toggle defaultChecked={dictionary.active} />
        </Form.Field>
        <div className="ui error message"></div>
      </Form>
      <Modal.Actions>
        <Button color='black' onClick={onHide}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button positive onClick={onHide}>
          <Icon name='checkmark' /> Save
        </Button>
      </Modal.Actions>
    </Modal.Content>
  </Modal>
)

DictionaryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  dictionary: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired
};

export default DictionaryModal