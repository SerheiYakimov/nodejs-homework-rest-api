import repositoryContacts from '../../repository/contacts';
import { HttpCode } from '../../lib/constants';
import { CustomError } from '../../lib/custom-error';


class Contact {
  async getContacts (req, res, _next) {
  const { id: userId } = req.user;
  const contacts = await repositoryContacts.listContacts(userId, req.query);
  res.status(HttpCode.OK).json(
    {
      status: 'success',
      code: HttpCode.OK,
      data: { ...contacts },
    });
}

  async getContactById (req, res, _next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await repositoryContacts.getContactById(userId, id);
    // console.log(contact);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      });
    }
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
  }

  async addContact (req, res, _next) {
    const { id: userId } = req.user;
    const newContact = await repositoryContacts.addContact(userId, req.body);
    res
      .status(HttpCode.CREATED)
      .json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact: newContact },
      });
  }

  async removeContact (req, res, _next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await repositoryContacts.removeContact(userId, id);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      });
    }
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
  }

  async updateContact (req, res, _next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await repositoryContacts.updateContact(userId, id, req.body);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      });
    }
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
  }

}

export default Contact;







